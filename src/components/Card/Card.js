import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import service from '../../utils/axiosConfig';
import { FORM_FILL_STRUCTURED } from '../../utils/config';
import { formatString } from '../../utils/formatString';
import CustomAlert from '../CustomAlert/CustomAlert';
import Modal from './Modal';

const Card = ({ name, email, phone, comment, city, requestType, address, uuid, rating, totalCount, createdDate, isLink, updateCard, action, lastReported }) => {
    const [alert, setAlert] = useState({
        isOpen: false,
        message: '',
        type: 'error'
    })

    const [openModal, setOpenModal] = useState(false)
    const [openComments, setOpenComments] = useState(false)
    const [actionZ, setActionZ] = useState("")
    const [dataCardEvent, setDataCardEvent] = useState(null)
    
    useEffect(() => {
        if(alert.isOpen){
            setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    useEffect(() => {
        if(openComments){
            service.get(`${FORM_FILL_STRUCTURED}/action/${uuid}`)
            .then(res => {
                setDataCardEvent(res.data.response.dataCardEvent.reverse())
            })
        }
    }, [openComments])

    const getDateString = value => {
        return new Date(value)
    }

    const onVerifySubmit = e => {
        e.preventDefault()
        setActionZ(e.target.name)
        setOpenModal(true)
    }

    const addComment = comment => {
        setOpenModal(false)
        const payload = {
            uuid: uuid,
            comment: comment,
            action: actionZ,
        }
        service.post(FORM_FILL_STRUCTURED+"/action", payload)
        .then(res => {
            if(res.data.success){
                console.log("This was successful");
                setAlert({
                    ...alert,
                    message: 'Data has been updated!',
                    type: 'success',
                    isOpen: true,
                })
                updateCard(res.data.response.dataCard)
            }
            else{
                setAlert({
                    ...alert,
                    message: res.data.message,
                    type: 'error',
                    isOpen: true,
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const onShareLink = e => {
        e.preventDefault()
        console.log(window.location);
        if(isLink){
            navigator.clipboard.writeText(`${window.location.href}`)
        }
        else if(window.location.pathname === "/add-info"){
            navigator.clipboard.writeText(`${window.location.origin}/get-info/${uuid}`)
        }
        else{
            navigator.clipboard.writeText(`${window.location.href}/${uuid}`)
        }
        setAlert({
            isOpen: true,
            type: 'success',
            message: 'Link copied to clipboard!'
        })
    }
    
  return (
    <div className="card">
        <div className="upperRow">
            <div className="content-wrapper">
                <div className="block">
                    <span>Name</span>
                    <p>{ name ? name : "-" }</p>
                </div>
                <div className="block">
                    <span>Phone</span>
                    <p>{ phone ? phone : "-" }</p>
                </div>
                <div className="block">
                    <span>City</span>
                    <p>{ city ? city : "-" }</p>
                </div>
                <div className="block">
                    <span>Type</span>
                    <p>{ requestType ? requestType : "-" }</p>
                </div>
                <div className="block">
                    <span>Email</span>
                    <p>{ email ? email : "-" }</p>
                </div>
                <div className="block">
                    <span>Address</span>
                    <p>{ address ? address : "-" }</p>
                </div>
                <div className="block">
                    <span>Description</span>
                    <p>{ comment ? comment : "-" }</p>
                </div>
                <div className="block">
                    <span>Date Created</span>
                    <p>{ createdDate ? `${formatString(getDateString(createdDate).getDate())}/${formatString(getDateString(createdDate).getMonth()+1)}/${getDateString(createdDate).getFullYear()}` : "-" }</p>
                </div>
            </div>
            <div className="arrows">
                <div className="vote">
                    <Box position="relative" display="inline-flex">
                        <CircularProgress variant="determinate" value={100} size={50} />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="caption" component="div" style={{fontSize: '20px'}} color="primary">{rating ? rating.toFixed(1) : 0}</Typography>
                        </Box>
                    </Box>
                    <div className="review">
                        <button className="btn" onClick={() => setOpenComments(true)}>
                            {totalCount ? totalCount : 0} reviews
                        </button>
                    </div>
                    <div className="share">
                        <button className="btn" onClick={onShareLink}>
                            <Send />
                            <span>Share Info</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="bottomRow">
            <button name="Verify" className="btn" onClick={onVerifySubmit}>Verify</button>
            <button name="OutOfStock" className="btn" onClick={onVerifySubmit}>Out of Stock</button>
            <button name="Unanswered" className="btn" onClick={onVerifySubmit}>Unanswered</button>
            <button name="Report" className="btn" onClick={onVerifySubmit}>Report</button>
            {
                action && lastReported ?
                <button onClick={e => e.preventDefault()} className="btn">{`Last Reported: ${action}, Date: ${formatString(getDateString(lastReported).getDate())}/${formatString(getDateString(lastReported).getMonth()+1)}/${getDateString(lastReported).getFullYear()}, Time: ${formatString(getDateString().getHours())}:${formatString(getDateString().getMinutes())}`}</button> : null
            }
        </div>
        {
            alert.isOpen &&
            <CustomAlert
                isOpen={alert.isOpen}
                message={alert.message}
                type={alert.type}
            />
        }
        {
            openModal &&
            <Modal open={openModal} title="Comment your experience" addComment={addComment} onClose={() => setOpenModal(false)} type="confirm" />
        }
        {
            openComments && dataCardEvent &&
            <Modal open={openComments} title="Comment History" onClose={() => setOpenComments(false)} data={dataCardEvent} />
        }
    </div>
  );
}

export default Card;