import React, { Component } from 'react';
import Button from 'react-bootstrap/button';
import Card from 'react-bootstrap/card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class EditArticle extends Component {
  REST_API = "http://localhost:8000/api";
  constructor(props){
    super(props);
    this.state={
     article: [],
     category: [],
     id: this.props.match.params.id,
     title:"",
     body:"",
     category_id:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let id = this.state.id;
    fetch(this.REST_API + "/articles/" + id,{
      method: 'GET'
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
           article: result,
           category: result.category,
           title: result.title,
           body: result.body,
           category_id: result.category.id
         });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleChange(e){
    const target = e.target;
    const field = target.name;
    const value = (target.type === 'select') ? target.select : target.value;

    this.setState({
      [field]: value
    });
  }

  onSubmit(e){
    e.preventDefault();
    const articleDetails = {
    title: this.state.title,
    body: this.state.body,
    category_id: this.state.category_id
    };
    fetch(this.REST_API + '/articles/'+this.state.id,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.api_token
      },
      body: JSON.stringify(articleDetails)
    })
    .then(res => res.json())
    .then(
      (result) => {
        const article = result;
        this.props.onSuccessEdit(article);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  render(){
    return (
      <Card className="mt-2">
      <Card.Body>
        <Card.Title>Edit Article Form</Card.Title>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control 
            required
            type="text"
            name="title"
            defaultValue={this.state.article.title}
            onChange={this.handleChange} 
            />
          </Form.Group>

          <Form.Group controlId="textarea">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" name="body" defaultValue={this.state.article.body} rows={3} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" defaultValue="Choose..." name="category_id" onChange={this.handleChange} value={this.state.article.category}>
              <option>{this.state.category.title}</option>
              {this.props.categories.map((category) => <option key={category.id} value={category.id}>{category.title}</option>)}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Card.Body>
      </Card>
    );
  }
}

export default EditArticle;
