import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

class ArticleList extends Component {
  render(){
    const articles = this.props.articles;

    const selectedCategory = this.props.selectedCategory;
    const selectedAuthor = this.props.selectedAuthor;

    const filteredArticles = articles.filter(article => 
      (selectedCategory === null || selectedCategory === article.category_id) &&
      (selectedAuthor === null || article.user.name.includes(selectedAuthor)));
                      
    return (
      <ListGroup className="mt-2">
          {filteredArticles.map(article => (
            <ListGroup.Item key={article.id}>{article.title}</ListGroup.Item>
        )) }
      </ListGroup>
    );
  }
}

export default ArticleList;
