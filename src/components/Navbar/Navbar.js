import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="logo">COVID Helpers</div>
            <ul className="nav-ul">
                <li className="nav-li">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-li">
                    <Link to="/seek">Get Help</Link>
                </li>
                <li className="nav-li">
                    <Link to="/contribute">Contribute</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
