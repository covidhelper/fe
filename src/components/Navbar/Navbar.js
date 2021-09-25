import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    </nav>
  );
};

export default Navbar;
