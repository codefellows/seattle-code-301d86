import React from 'react';
import Button from 'react-bootstrap/Button';
import './Person.css';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waves: 0,
      greeting: '',
      helpMe: false
    };
  };

  handleWaves = () => {
    this.setState({
      waves: this.state.waves + 1,
      greeting: 'Hello!'
    });
  };

  needsHelp = () => {
    this.setState({
      helpMe: true
    });
  };

  helpGiven = () => {
    this.setState({
      helpMe: false
    });
  };

  render() {
    // Step 1: I want to render all names and images
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>👋 {this.state.waves} greetings</p>
        <p onClick={this.handleWaves}>Say Hello!</p>
        <img 
          src={this.props.imageURL}
          alt={this.props.name}
          title={this.props.name}
        />
        <div>{this.state.helpMe ? 'I need help' : ''}</div>
        <Button onClick={this.needsHelp}>Help!</Button>
        <Button onClick={this.helpGiven} variant="success">I got help</Button>
      </article>
    )
  }
}

export default Person;
