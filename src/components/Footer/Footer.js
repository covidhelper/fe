import { GitHub, Mail, WhatsApp } from '@material-ui/icons'
import React from 'react'

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <footer>
                <div className="about">
                    <p>About Us</p>
                    <p>
                        There’s a flood of information available about the suppliers/providers/helpers on social media. We need to curate a verifiable listing for bridging the gap between takers and givers.
                    </p>
                </div>
                <div className="contact">
                    <p>Contact Us</p>
                    <div className="block">
                        <div className="icon">
                            <Mail />
                        </div>
                        <span>helperscovid@gmail.com</span>
                    </div>
                    <div className="block">
                        <div className="icon">
                            <WhatsApp />
                        </div>
                        <span>+91 9370787273</span>
                    </div>
                    <div className="block">
                        <div className="icon">
                            <GitHub />
                        </div>
                        <a href="https://github.com/covidhelper/fe">https://github.com/covidhelper/fe</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
