import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
// import ThemeSwitcher from './Themes';
import { RxAvatar } from 'react-icons/rx'
import Login from '../Admin/Login';


export default function NavBar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: 'blue' }}>Flora</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/special">Special</Nav.Link>

            </Nav>
            <Nav className="ms-auto align-items-left">
              <Login />
              {/* <ThemeSwitcher /> */}
            </Nav>
            
          </Navbar.Collapse>  
          {/* <Login/> */}
          
        </Container>
      </Navbar>

    </>
  );
}