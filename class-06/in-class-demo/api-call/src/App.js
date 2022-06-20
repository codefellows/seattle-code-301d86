import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      starWarsChars: [],
      cityData: {},
      error: false,
      errorMessage: ''
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // make a request to the SW API and get data
      let starWarsCharacters = await axios.get('https://swapi.dev/api/people/?page=1');
      // proof of life
      // console.log(starWarsCharacters.data.results);
      // save the data in state
      this.setState({
        starWarsChars: starWarsCharacters.data.results,
        error: false
      });
    } catch (error) {
      console.log('error: ', error)
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`
      });
    }
  };

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    // make my request to my API
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityInfo = await axios.get(url);
    console.log(cityInfo.data[0]);
  }

  render() {
    // console.log(this.state.starWarsChars);
    // console.log(this.state.city);

    // map image src
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=10`


    let starWarList = this.state.starWarsChars.map((character, idx) => {
      return <li key={idx}>{character.name}</li>;
    })

    return (
      <>
        <h1>Data from an API</h1>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Display Star Wars data</button>
        </form>
        {/* WTF */}
        {this.state.error
          // render the error message:
          ? <p>{this.state.errorMessage}</p>
          // render the star wars list:
          : <ul>
            {starWarList}
          </ul>
        }
        <form onSubmit={this.handleCitySubmit}>
          <label>Pick a City:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Get City Data</button>
        </form>
      </>
    );
  }
}

export default App;
