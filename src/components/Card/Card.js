import { ArrowDropDown, ArrowDropUp, Mail } from '@material-ui/icons';
import React, { useState } from 'react';

const Card = ({ name, email, phone, desc, state, city, type, addr, up, down, mail }) => {
    const [cardOpen, setCardOpen] = useState(false)

  return (
    <div className="card" onClick={() => setCardOpen(prevState => !prevState)}>
        <div className="upperRow">
            <div className="content-wrapper">
                <div className="block">
                    <span>Name</span>
                    <p>{ name }</p>
                </div>
                <div className="block">
                    <span>Email</span>
                    <p>{ email }</p>
                </div>
                <div className="block">
                    <span>Phone</span>
                    <p>{ phone }</p>
                </div>
                <div className="block">
                    <span>Description</span>
                    <p>{ desc }</p>
                </div>
                <div className="block">
                    <span>State</span>
                    <p>{ state }</p>
                </div>
                <div className="block">
                    <span>City</span>
                    <p>{ city }</p>
                </div>
                <div className="block">
                    <span>Address</span>
                    <p>{ addr }</p>
                </div>
                <div className="block">
                    <span>Type</span>
                    <p>{ type }</p>
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
                <button name="verify" className="btn">Verify</button>
                <button name="outOfStock" className="btn">Out of Stock</button>
                <button name="noanswer" className="btn">Unanswered</button>
                <button name="report" className="btn">Report</button>
            </div>
        }
    </div>
  );
}

export default Card;