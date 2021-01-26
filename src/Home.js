import React, { Component } from 'react';
import Articles from './Articles';
class Home extends Component {
  render(){
    return (
      <Articles 
      user={this.props.user}
      articles={this.props.articles} 
      categories={this.props.categories}
      deleteArticle={this.props.deleteArticle}
      />
    );
  }
}

export default Home;
