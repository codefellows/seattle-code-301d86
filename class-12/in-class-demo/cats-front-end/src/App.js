import React from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import Cats from './Cats';
import './App.css';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: []
    }
  }

  handleCatSubmit = (e) => {
    e.preventDefault();
    let newCat = {
      name: e.target.name.value,
      color: e.target.color.value,
      spayNeuter: e.target.spayNeuter.checked,
      location: e.target.location.value
    }
    this.postCats(newCat)
  }

  postCats = async (newCatObj) => {
    try {
      let url = `${SERVER}/cats`;
      let createdCat = await axios.post(url, newCatObj);
      // this.getCats();
      this.setState({
        cats: [...this.state.cats, createdCat.data]
      });
    } catch(error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  deleteCats = async (id) => {
    try {
      let url = `${SERVER}/cats/${id}`;
      await axios.delete(url);
      // this.getCats();
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);
      this.setState({
        cats: updatedCats
      });
    } catch(error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  getCats = async () => {
    // console.log('I fired');
    try {
      let results = await axios.get(`${SERVER}/cats`);
      // console.log(results.data);
      this.setState({
        cats: results.data
      })
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  // net effect is that when the site load (I should say this specific component loads), the data will be displayed
  componentDidMount() {
    this.getCats();
  }

  render() {
    // console.log(this.state.cats);
    
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
        {
          this.state.cats.length > 0 &&
          <>
            <Cats cats={this.state.cats} deleteCats={this.deleteCats}/>
          </>
        }
        <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
