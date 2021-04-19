import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import service from '../../utils/axiosConfig';
import { FORM_FILL_STRUCTURED } from '../../utils/config';
import CustomAlert from '../CustomAlert/CustomAlert';

const Card = ({ name, email, phone, comment, state, city, requestType, address, uuid, rating, totalCount, isLink, updateData }) => {
    const [alert, setAlert] = useState({
        isOpen: false,
        message: '',
        type: 'error'
    })

    useEffect(() => {
        if(alert.isOpen){
            setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    const [openModal, setOpenModal] = useState(false)

    const onVerifySubmit = e => {
        e.preventDefault()
        const payload = {
            uuid: uuid,
            comment: "Hello friends! This is me!",
            action: e.target.name,
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
                updateData(res.data.response.dataCard)
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
        if(isLink){
            navigator.clipboard.writeText(`${window.location.href}`)
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
                    <span>Email</span>
                    <p>{ email ? email : "-" }</p>
                </div>
                <div className="block">
                    <span>Phone</span>
                    <p>{ phone ? phone : "-" }</p>
                </div>
                <div className="block">
                    <span>Description</span>
                    <p>{ comment ? comment : "-" }</p>
                </div>
                <div className="block">
                    <span>State</span>
                    <p>{ state ? state : "-" }</p>
                </div>
                <div className="block">
                    <span>City</span>
                    <p>{ city ? city : "-" }</p>
                </div>
                <div className="block">
                    <span>Address</span>
                    <p>{ address ? address : "-" }</p>
                </div>
                <div className="block">
                    <span>Type</span>
                    <p>{ requestType ? requestType : "-" }</p>
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
                            <Typography variant="caption" component="div" style={{fontSize: '20px'}} color="primary">{rating ? rating : 0}</Typography>
                        </Box>
                    </Box>
                    <div className="review">
                        <button className="btn" onClick={onShareLink}>
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
            <form>
                <button name="Verify" className="btn" onClick={onVerifySubmit}>Verify</button>
                <button name="OutOfStock" className="btn" onClick={onVerifySubmit}>Out of Stock</button>
                <button name="Unanswered" className="btn" onClick={onVerifySubmit}>Unanswered</button>
                <button name="Report" className="btn" onClick={onVerifySubmit}>Report</button>
            </form>
        </div>
        {
            alert.isOpen &&
            <CustomAlert
                isOpen={alert.isOpen}
                message={alert.message}
                type={alert.type}
            />
        }
    </div>
  );
}

export default Card;