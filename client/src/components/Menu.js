import React, { memo, useState } from "react";
import md5 from "md5";
import { SearchIcon, MenuIcon } from "../utils/Icons";

import "../styles/Menu.css";

const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuStyle = menuIsOpen ? { width: "200px", padding: "0 5px" } : {};
  const overlayStyle = menuIsOpen
    ? { visibility: "visible", opacity: "0.5" }
    : { visibility: "hidden", opacity: "0" };

  const openMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <>
      <div className="overlay" style={overlayStyle} />
      <div className="menu" style={menuStyle}>
        <div className="menu__row">
          <a href="http://146.59.239.192:3001/temperatures">
            <img
              className="menu--logo"
              src="/logo.png"
              alt="puit"
            />
          </a>
        </div>
      </div>
      <div className="menu-mobile">
        <MenuIcon className="menu-mobile__button" onClick={openMenu} />
      </div>
    </>
  );
};

export default memo(Menu);
