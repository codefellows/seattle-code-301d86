import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
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

  handleHeadlineClick = () => {
    this.props.handleOnShowModal(this.props.name);
  }

  render() {
    // Step 1: I want to render all names and images
    return (
      <Col className="mt-4">
        <Card className="h-100 p-3">
          <Card.Title onClick={this.handleHeadlineClick}>{this.props.name}</Card.Title>
          <p>👋 {this.state.waves} greetings</p>
          <p onClick={this.handleWaves}>Say Hello!</p>
          <Card.Img
            src={this.props.imageURL}
            alt={this.props.name}
            title={this.props.name}
            onClick={this.props.addHearts}
          />
          <div>{this.state.helpMe ? 'I need help' : ''}</div>
          <Button onClick={this.needsHelp}>Help!</Button>
          <Button onClick={this.helpGiven} variant="success">I got help</Button>
        </Card>
      </Col>
    )
  }
}

export default Person;
