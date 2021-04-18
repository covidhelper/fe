import { ArrowDropDown, ArrowDropUp, Mail } from '@material-ui/icons';
import React from 'react';

const Card = () => {

  return (
    <div className="card">
        <div className="content-wrapper">
            <div className="block">
                <span>Name</span>
                <p>Atharva</p>
            </div>
            <div className="block">
                <span>Email</span>
                <p>vrocias1@gmail.com</p>
            </div>
            <div className="block">
                <span>Phone</span>
                <p>9370787273</p>
            </div>
            <div className="block">
                <span>Description</span>
                <p>I have 10 Oxygen Cylinders</p>
            </div>
            <div className="block">
                <span>State</span>
                <p>Maharashtra</p>
            </div>
            <div className="block">
                <span>City</span>
                <p>Pune</p>
            </div>
            <div className="block">
                <span>Address</span>
                <p>Greater Noida, Delhi</p>
            </div>
            <div className="block">
                <span>Type</span>
                <p>Oxygen Cylinders</p>
            </div>
        </div>
        <div className="arrows">
            <div className="vote">
                <div className="upvote">
                    <ArrowDropUp />
                    100
                </div>
                <div className="downvote">
                    <ArrowDropDown />
                    20
                </div>
            </div>
            <div className="email">
                <Mail />
                Email
            </div>
        </div>
    </div>
  );
}

export default Card;