import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import HomeButton from "../components/HomeButton.jsx";
import UserProfileButton from "../components/UserProfileButton.jsx";

{
  /* <img
className="logo"
src="https://api.logo.com/api/v2/images?format=webp&logo=logo_1e4ac2a3-9208-41c5-9619-160430ce8bd4&width=2000&quality=100&primary=%23000000&secondary=%23000000&accent=%23000000&background=transparent&tertiary=%23000000&fit=contain&u=1668052933"
></img> */
}

function NavBar() {
  return (
    <Navbar bg="success" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            className="logo"
            src="https://api.logo.com/api/v2/images?format=webp&logo=logo_1e4ac2a3-9208-41c5-9619-160430ce8bd4&width=2000&quality=100&primary=%23ffffff&secondary=%23ffffff&accent=%23ffffff&background=transparent&tertiary=%23ffffff&fit=contain&u=1668052933"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <HomeButton />
            </Nav.Link>
            <Nav.Link href="#">
              <UserProfileButton />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
