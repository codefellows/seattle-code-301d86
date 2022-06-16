import React from 'react';
import Person from './Person.js';
import './Main.css';
import { Container, Row } from 'react-bootstrap';

class Main extends React.Component {

  render() {
    let people = this.props.data.map((pep, idx) => {
        return <Person 
          person={pep}
          // name={pep.name}
          // imageURL={pep.imageURL}
          key={idx}
          addHearts={this.props.addHearts}
          handleOnShowModal={this.props.handleOnShowModal}
        />
    });
    // console.log(this.props);
    return (
      <main>
        <Container>
          <Row xs={1} sm={2}md={3} lg={4}>
          {people}
          </Row>
        </Container>
      </main>
    )
  }
}

export default Main;
