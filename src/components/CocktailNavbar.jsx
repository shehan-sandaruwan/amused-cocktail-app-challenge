import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "assets/logo.png";

import "css/cocktailnavbar.css";

const CocktailNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar-wrapper">
      <Navbar.Brand href="#">
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
    </Navbar>
  );
};

export default CocktailNavbar;
