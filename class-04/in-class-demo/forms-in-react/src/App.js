import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import {Form, Button, ListGroup } from 'react-bootstrap';

let data = [1,2,3,4,5,6,7,8,9,10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      howToSort: '',
      sortedData: data
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target.name.value;
    let selected = event.target.selected.value;
    // console.log(username, selected);
    let firstname = event.target.firstName.value;
    console.log(firstname);
    this.setState({
      name: username,
      howToSort: selected
    });
    // console.log('From State called in the submit handler: ' + this.state.name + ' ' + this.state.howToSort);
  };

  handleInput = (event) => {
    let username = event.target.value;
    this.setState({
      name: username
    });
  }

  handleSelect = event => {
    let selected = event.target.value;
    // console.log(selected);
    if (selected === 'even') {
      let newData = data.filter(num => num % 2 === 0);
      this.setState({
        sortedData: newData
      });
    } else if (selected === 'odd') {
      let newData = data.filter(num => num % 2 === 1);
      this.setState({
        sortedData: newData
      });
    } else {
      // if "all" is selected
      this.setState({
        sortedData: data
      });
    }
  }

  render() {
    // console.log('From State called in the render: ' + this.state.name);
    // console.log(this.state.sortedData);
    let numbers = this.state.sortedData.map((num, idx) => {
      return <ListGroup.Item key={idx}>{num} - {this.state.sortedData[idx]}</ListGroup.Item>
    })

    return (
      <>
        <header><h1>Forms in React</h1></header>
        <main>
          <ListGroup>
            {numbers}
          </ListGroup>

          <Form onSubmit={this.handleSubmit}>
            <Form.Label>Username:
              <Form.Control type="text" name="name" onInput={this.handleInput}/>
            </Form.Label>

            <Form.Group controlId='firstName'>
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <Form.Label htmlFor="lastName">Last Name:</Form.Label>
            <Form.Control type="text" name="lastname" id="lastName"/>

            <Form.Group>
              <p>Selected Numbers</p>
              <Form.Select name="selected" onChange={this.handleSelect}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </main>
      </>
    )
  }
}

export default App;


/*


<form onSubmit={this.handleSubmit}>
            <label>Name:
              <input type="text" name="name" onInput={this.handleInput}/>
            </label>
            <fieldset>
              <legend>Selected Numbers</legend>
              <select name="selected" onChange={this.handleSelect}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </fieldset>
            <button type="submit">Submit</button>
          </form>

*/
