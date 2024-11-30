import React, { useState, useContext } from "react";
import "./NavHeader.scss";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../src/React-icon.svg";
const NavHeader = (props) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <div className="nav-header">
        <Navbar expand="lg" className="bg-body-tertiary bg-header">
          <Container>
            <Navbar.Brand href="#home" className="brand-name">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <spam>React</spam>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" exact className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  users
                </NavLink>
                <NavLink to="/projects" className="nav-link">
                  projects
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </Nav>
            </Navbar.Collapse>

            <Nav>
              <Nav.Item className="nav-link">Welcome VXC</Nav.Item>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
