import './App.css';
import React, { Component } from 'react'

import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import Navigation from './Navigation';
import Articles from './Articles';
import { Container } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

class App extends Component {
  REST_API = "http://localhost:8000/api";
  constructor(props){
    super(props);
    let localUser = JSON.parse(localStorage.getItem('user')) || null;
    this.state = {
      user: localUser,
      categories:[],
      articles: [],
      error: null
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
  }
  componentDidMount(){
    fetch(this.REST_API + "/articles")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          articles: result
        });
      },
      (error) => {
        this.setState({
          error: error
        });
      }
    );
    fetch(this.REST_API + "/categories")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          categories: result
        });
      },
      (error) => {
        this.setState({
          error: error
        });
      }
    );
  }

  onLoginSuccess(loggedInUser, remember){
    this.setState({
      user: loggedInUser
    });
    if(remember){
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    }
    this.props.history.push('/home');
  }

  onLogoutSuccess(msg){
    this.setState({
      user: null
    });
      localStorage.removeItem('user');
  }
  
  
  render(){
    return (
      <Container>
        <Navigation onLogoutSuccess={this.onLogoutSuccess} user={this.state.user} />
        <Switch>
          <Route exact path="/">
              <Articles 
                      articles={this.state.articles} 
                      categories={this.state.categories}
              />
          </Route>
          
          <Route exact path="/login">
              <Login onLoginSuccess={this.onLoginSuccess} />
          </Route>

          <Route exact path="/register">
              <Register />
          </Route>

          <Route exact path="/home">
              <Home />
          </Route>
        </Switch>
      </Container>
    );
  }
}


function Home(){
  return(
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default withRouter(App);
