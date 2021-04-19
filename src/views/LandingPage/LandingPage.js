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
                        There’s a flood of information available about the suppliers/providers/helpers on social media. We need to curate a verifiable listing for bridging the gap between seekers and givers.
                    </div>
                    <div className="cta">
                        <Link to="/get-help">
                            <button className="btn">
                                Get Help
                            </button>
                        </Link>
                        <Link to="/contribute">
                            <button className="btn">
                                Contribute
                            </button>
                        </Link>
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
