import React, { Component } from 'react';

import { ListGroup } from 'react-bootstrap';

class ViewArticle extends Component {
  REST_API = "http://localhost:8000/api";
  constructor(props){
    super(props);
    this.state={
      id: this.props.match.params.id,
      title:"",
      body:"",
      category_id:""
    }
  }
 
  componentDidMount(){
    let id = this.state.id;
    fetch(this.REST_API + "/articles/"+ id,{
      method: 'GET'
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          title: result.title,
          body: result.body,
          category_id: result.category
        });
      },
      (error) => {
        this.setState({
          error: error
        });
      }
    );
  }

  render(){
    return (
       <div className="my-2">
       <ListGroup>
         <ListGroup.Item>
        <h2>Title</h2> {this.state.title}
         </ListGroup.Item>
         <ListGroup.Item>
        <h2>Body</h2> {this.state.body}
         </ListGroup.Item>
         <ListGroup.Item>
        <h2>Category</h2> {this.state.category_id.title}
         </ListGroup.Item>
       </ListGroup>
     </div>
    );
  }
}

export default ViewArticle;
