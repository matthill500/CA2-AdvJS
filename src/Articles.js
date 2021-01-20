import React, { Component } from 'react';

import Filters from './Filters';
import ArticleList from './ArticleList';

class Articles extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedCategory: null,
      selectedAuthor: null
    }
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
  }
  onCategoryChange(e){
    const category = e.target.value;
    this.setState({
      selectedCategory: category
    });
  }
  onAuthorChange(e){
    const author = e.target.value;
    this.setState({
      selectedAuthor: author
    });
  }

  render(){
    return (
      <div>
        <Filters 
                      categories={this.props.categories} 
                      onCategoryChange={this.onCategoryChange}
                      onAuthorChange={this.onAuthorChange}
          />
          <ArticleList articles={this.props.articles} 
                       selectedCategory={this.state.selectedCategory}
                       selectedAuthor={this.state.selectedAuthor} 
          />
        </div>
    );
  }
}

export default Articles;
