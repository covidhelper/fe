import { ArrowDropDown, ArrowDropUp, Mail } from '@material-ui/icons';
import React, { useState } from 'react';
import service from '../../utils/axiosConfig';
import { FORM_FILL_STRUCTURED } from '../../utils/config';
import CustomAlert from '../CustomAlert/CustomAlert';

const Card = ({ name, email, phone, comment, state, city, requestType, address, up, down, mail, uuid }) => {
    const [cardOpen, setCardOpen] = useState(true)
    const [alert, setAlert] = useState({
        isOpen: false,
        message: '',
        type: 'error'
    })

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
                setAlert({
                    isOpen: true,
                    message: 'Data has been updated!',
                    type: 'success'
                })
            }
            else{
                setAlert({
                    isOpen: true,
                    message: res.data.message,
                    type: 'error'
                })
            }
        })
        .catch(err => {
            console.log(err);
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
                    <div className="upvote">
                        <ArrowDropUp />
                        { up }
                    </div>
                    <div className="downvote">
                        <ArrowDropDown />
                        { down }
                    </div>
                </div>
                <div className="email">
                    <Mail />
                    Email
                </div>
            </div>
        </div>
        {
            cardOpen &&
            <div className="bottomRow">
                <form>
                    <button name="Verify" className="btn" onClick={onVerifySubmit}>Verify</button>
                    <button name="OutOfStock" className="btn" onClick={onVerifySubmit}>Out of Stock</button>
                    <button name="Unanswered" className="btn" onClick={onVerifySubmit}>Unanswered</button>
                    <button name="Report" className="btn" onClick={onVerifySubmit}>Report</button>
                    <button name="date" className="btn" onClick={onVerifySubmit}>Next Available Date</button>
                </form>
            </div>
        }
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