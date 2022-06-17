import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.city, 'On the submit');
  }
  
  handleOnInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  render() {
    console.log('app state: ', this.state.city);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label> Pick a city
            <input type='text' onChange={this.handleOnInput} />
          </label>
          <button>Go!</button>
        </form>
      </>
    );
  }
}

export default Main;