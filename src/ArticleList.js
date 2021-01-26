import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';


class ArticleList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedArticle: null
    };
    this.onArticleSelected = this.onArticleSelected.bind(this);
  }

  onArticleSelected(e){
    const article = parseInt(e.target.value);
    this.setState({
      selectedArticle: article
    });
  }

  render(){
    const articles = this.props.articles;

    const onDeleteArticle = this.props.onDeleteArticle;

    const selectedCategory = this.props.selectedCategory;
    const selectedAuthor = this.props.selectedAuthor;

    const filteredArticles = articles.filter(article => 
      (selectedCategory === null || selectedCategory === JSON.stringify(article.category_id))
      && (selectedAuthor === null || article.user.name.includes(selectedAuthor)));
      
                      
    return (

        <ListGroup className="mt-2">
            {!this.props.user && filteredArticles.map(article => (
              <ListGroup.Item key={article.id}>
                {article.title}
              </ListGroup.Item>
            )) }

            {this.props.user && filteredArticles.map(article => (
              <ListGroup.Item key={article.id}>
                <Form.Check 
                type="radio" 
                name="article" 
                value={article.id} 
                label={article.title} 
                onChange={this.onArticleSelected}>   
                </Form.Check>
                {article.id === this.state.selectedArticle &&
              <div>
                <Button variant="danger" className="float-right" size="sm" onClick={() => onDeleteArticle(article.id)}>Delete</Button>
                <Button variant="warning" to={"EditArticle/"+article.id} state as={Link} className="float-right mr-1" size="sm">Edit</Button>
                <Button variant="primary" to={"ViewArticle/"+article.id} state as={Link} className="float-right mr-1" size="sm">View</Button>
              </div>}
              </ListGroup.Item>
            )) }
        </ListGroup>

    );
  }
}

export default ArticleList;
