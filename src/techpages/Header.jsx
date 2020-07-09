import React, { Component } from "react";
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <div className="top-logo-box">
      <Link to="/main">
        <img
          src="./img/logo.png"
          srcSet="./img/logo@2x.png 2x, ./img/logo@3x.png 3x"
          alt="Logo"
        />
      </Link>
    </div>
  );
};

const HeaderNav = () => {
  return (
    <div className="top-nav-box">
      <div className="nav-bar nav-about">
        <Link to="/main#OurMission">About</Link>
      </div>
      <div className="nav-bar nav-team">
        <Link to="/main#Team">Team</Link>
      </div>
      <div className="nav-bar nav-blog">
        <a href="https://medium.com/">Blog</a>
      </div>
      <div className="nav-bar nav-login">
        <Link to={"/login"}>Login</Link>
      </div>
      <div className="nav-bar nav-signup">
        <Link to={"/signup"} className="button-main-inversed button-signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-grid-container header-grid-container-blue">
          <HeaderLogo />
          <HeaderNav />
        </div>
      </header>
    );
  }
}

export default Header;
