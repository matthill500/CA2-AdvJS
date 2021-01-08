import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Navigation extends Component {
  render(){
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Item>
              <Nav.Link href="#">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ml-auto">
              <Nav.Link href="#">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Logout</Nav.Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Navigation;
