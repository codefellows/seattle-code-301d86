import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petData: {},
      species: ''
    }
  }

  handleInput = (e) => {
    this.setState({
      species: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // http://localhost:3001/pet?species=dog
    let url = `${process.env.REACT_APP_SERVER}/pet?species=${this.state.species}`;
    let petData = await axios.get(url);
    console.log(petData.data);
    this.setState({
      petData: petData.data,
      error: false,
      showPet: true
    });
  }

  render() {
    return (
      <>
        <h1>Find Your Pet</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search
            <input type="text" onInput={this.handleInput}/>
          </label>
          <button>Display Pet</button>
        </form>
        { 
          this.state.showPet
          &&
          <p>{this.state.petData.name} is a {this.state.petData.breed}</p>
        }
      </>
    );
  }
}

export default App;
