import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

class Navigation extends Component {
  REST_API = "http://127.0.0.1:8000/api";
  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout(e){
    fetch(this.REST_API + '/logout',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.api_token
      },
      body: ""
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.props.onLogoutSuccess(result.data);
      },
      (error) => {
        console.log(error);
        e.preventDefault();
      }
    )
  }
  render(){
    const user = this.props.user;
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/" href="#">React Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user === null &&
            <Nav.Item className="ml-auto">
              <Nav.Link as={Link} to="/login" href="#">Login</Nav.Link>
            </Nav.Item>}
            {user === null &&
            <Nav.Item>
              <Nav.Link as={Link} to="/register" href="#">Register</Nav.Link>
            </Nav.Item>}
            {user !== null &&
            <Nav.Item>
              <Nav.Link as={Link} to="/home" href="#">Home</Nav.Link>
            </Nav.Item>}
            {user !== null &&
            <Nav.Item className="ml-auto">
              <Nav.Link as={Link} to="login" onClick={this.onLogout} href="#">Logout</Nav.Link>
            </Nav.Item>}
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Navigation;
