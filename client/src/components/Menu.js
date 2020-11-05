import React, { memo, useState } from "react";
import md5 from "md5";
import {
  SearchIcon,
  MenuIcon
} from "../utils/Icons";

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
          <div className="menu__row-icon menu__row-icon--search">
            <SearchIcon className="menu__row-icon__svg" onClick={openMenu} />
          </div>
          <input
            className="menu__input"
            placeholder="Search..."
          />
        </div>
        <div className="menu__row">
          <img
            className="menu__row-icon menu__row-icon--avatar"
            src={`https://www.gravatar.com/avatar/${md5("chalotte.bettinelli@laposte.net")}?s=200&d=identicon`}
            alt="user"
            onClick={openMenu}
          />
        </div>
      </div>
      <div className="menu-mobile">
        <MenuIcon className="menu-mobile__button" onClick={openMenu} />
      </div>
    </>
  );
};

export default memo(Menu);
