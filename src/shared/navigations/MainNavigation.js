import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../ui/Backdrop";

import "./MainNavigation.css";

const MainNavigation = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setSideDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setSideDrawerOpen(false);
  };

  return (
    <div>
      {sideDrawerOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={sideDrawerOpen} onClick={closeDrawerHandler}>
        <nav>
          <NavLinks />
        </nav>
      </SideDrawer>
      <div className="main-navigation">
        <button className="main-nav__btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <div className="main-nav__title">
          <div>
            <Link to="/">
              <h1>게시판</h1>
            </Link>
          </div>
        </div>
        <div className="main-nav__links">
          <nav>
            <NavLinks />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
