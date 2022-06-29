import { Component } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends Component {
  render() {
    let cats = this.props.cats.map(cat => (
      <Cat 
        cat={cat} 
        key={cat._id} 
        deleteCats={this.props.deleteCats}
        updateCats={this.props.updateCats}
      />
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
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  // deletedHandler = () => {
  //   this.props.deleteCats(this.props.cat.id);
  // }
  render() {
    console.log(this.props.cat);
    return (
      <>
        <ListGroup.Item>
          {this.props.cat.name} is {this.props.cat.color}
          <div>
            <Button  
              variant="dark" 
              onClick={() => this.props.deleteCats(this.props.cat._id)}
            >
              Delete
            </Button>
            <Button
              onClick={() => this.setState({ showUpdateForm: true })}
            >
              update 
            </Button>
          </div>
        </ListGroup.Item>
        {
          this.state.showUpdateForm &&
          <UpdateCatForm 
            cat={this.props.cat}
            updateCats={this.props.updateCats}
          />
        }
      </>
    )
  }
}

export default Cats;
