import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
  }, [location.pathname]);

  return (
    <nav>
      <div className="logo">COVID19 Helpers</div>
      <div
        className="ham"
        onClick={() => setShowMenu((prevState) => !prevState)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-ul ${showMenu ? "" : "hide"}`}>
        <li
          className={`nav-li ${location.pathname === "/" ? " active" : null}`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`nav-li ${
            location.pathname === "/get-info" ? " active" : null
          }`}
        >
          <Link to="/get-info">Get Info</Link>
        </li>
        <li
          className={`nav-li ${
            location.pathname === "/add-info" ? " active" : null
          }`}
        >
          <Link to="/add-info">Add Info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
