import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class Filters extends Component {
  render(){
    return (
      <Accordion className="mt-2">
        <Card>
          <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Filters
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <Card.Body>
                <Form>
                  <fieldset>
                    <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                        Categories
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Check type="radio" name="category" value="Swimming" label="Swimming" />
                        <Form.Check type="radio" name="category" value="Kayaking" label="Kayaking" />
                        <Form.Check type="radio" name="category" value="Running" label="Running" />
                        <Form.Check type="radio" name="category" value="Cycling" label="Cycling" />
                        <Form.Check type="radio" name="category" value="Walking" label="Walking" />
                        <Form.Check type="radio" name="category" value="Karate" label="Karate" />
                      </Col>
                    </Form.Group>
                  </fieldset>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Author
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="Author" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Articles/page
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="number" value="0" />
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Filters;
