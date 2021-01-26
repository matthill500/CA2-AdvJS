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
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import ViewArticle from './ViewArticle';
import Home from './Home';

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
    this.onCreateArticleSuccess = this.onCreateArticleSuccess.bind(this);
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

  deleteArticle = (id) => {
    fetch(this.REST_API + "/articles/" + id,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.user.api_token
      },
    })
    .then(
      () => {
        let articles = this.state.articles;
        const articleId = articles.findIndex(article => article.id === id)
        articles.splice(articleId, 1);
        this.setState({
           articles
         });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCreateArticleSuccess = (article) =>{
    let articles = this.state.articles;
    articles.push(article);
    this.setState({ 
      articles
    })
    console.log(articles);
    this.props.history.push('/home');
  }

  onEditArticleSuccess = (article) =>{
    let articles = this.state.articles;
    console.log("hello");
    const articleIdx = articles.findIndex(art => art.id === article.id)
    articles.splice(articleIdx, 1, article);
    this.setState({ 
      articles
    })
    this.props.history.push('/home');
  }
  
  render(){
    return (
      <Container>
        <Navigation onLogoutSuccess={this.onLogoutSuccess} user={this.state.user} />
        <Switch>
          
          <Route exact path="/login">
              <Login onLoginSuccess={this.onLoginSuccess} />
          </Route>

          <Route exact path="/register">
              <Register />
          </Route>

          <Route exact path="/home">
              <Home 
                user={this.state.user}
                articles={this.state.articles} 
                categories={this.state.categories}
                deleteArticle={this.deleteArticle}
              />
          </Route>

          <Route exact path="/EditArticle/:id" 
            render={props => (
              <EditArticle {...props} 
              categories={this.state.categories}
              user={this.state.user}
              onSuccessEdit={this.onEditArticleSuccess}
              />
            )}/>
            

          <Route exact path="/create">
              <CreateArticle
                onSuccessCreate={this.onCreateArticleSuccess}
                categories={this.state.categories}
                user={this.state.user}
              />
          </Route>

          <Route exact path="/ViewArticle/:id"
          render={props => (
              <ViewArticle {...props} 
              />
            )}/>
        </Switch>
      </Container>
    );
  }
}


export default withRouter(App);
