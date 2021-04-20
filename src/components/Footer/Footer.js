import { GitHub, Mail } from '@material-ui/icons'
import React from 'react'

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <footer>
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
                            <GitHub />
                        </div>
                        <a href="https://github.com/covidhelper/fe">/covidhelper/fe</a>
                    </div>
                    <div className="block">
                        <div className="icon">
                            <GitHub />
                        </div>
                        <a href="https://github.com/covidhelper/curatedListBe">/covidhelper/curatedListBe</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
