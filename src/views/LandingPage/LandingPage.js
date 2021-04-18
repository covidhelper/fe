import React from 'react'
import { Link } from 'react-router-dom'
import CoverImage from '../../assets/images/cover-image.svg'

const LandingPage = () => {
    return (
        <div className="layout-wrapper">
            <div className="landing-container">
                <div className="content">
                    <div className="heading">
                        Looking for help near you in these tough times? Don't worry, we've got you covered!
                    </div>
                    <div className="sub-heading">
                        We are building a self-providing community of helpers and seekers.
                    </div>
                    <div className="cta">
                        <button className="btn">
                            <Link to="/seek">Get Help</Link>
                        </button>
                        <button className="btn">
                            <Link to="/contribute">Contribute</Link>
                        </button>
                    </div>
                </div>
                <div className="image">
                    <img src={CoverImage} alt="Cover Image" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
