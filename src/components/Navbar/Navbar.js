import { Menu } from '@material-ui/core'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    return (
        <nav>
            <div className="logo">COVID Helpers</div>
            <ul className="nav-ul">
                <li className={`nav-li ${location.pathname === "/" ? ' active' : null}`}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`nav-li ${location.pathname === "/get-help" ? ' active' : null}`}>
                    <Link to="/get-help">Get Help</Link>
                </li>
                <li className={`nav-li ${location.pathname === "/contribute" ? ' active' : null}`}>
                    <Link to="/contribute">Contribute</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
