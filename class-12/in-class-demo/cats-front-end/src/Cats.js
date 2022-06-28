import { Component } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';

class Cats extends Component {
  render() {
    let cats = this.props.cats.map(cat => (
      <Cat cat={cat} key={cat._id} deleteCats={this.props.deleteCats}/>
    ))
    return (
      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    )
  }
}

class Cat extends Component {

  // deletedHandler = () => {
  //   this.props.deleteCats(this.props.cat.id);
  // }
  render() {
    console.log(this.props.cat);
    return (
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color}
        <Button variant="dark" onClick={() => this.props.deleteCats(this.props.cat._id)}>Delete</Button>
      </ListGroup.Item>
    )
  }
}

export default Cats;
