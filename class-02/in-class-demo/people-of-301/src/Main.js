import React from 'react';
import Person from './Person.js';
import data from './data.json';
import './Main.css';

class Main extends React.Component {
  render() {
    let people = []
    data.forEach((pep, idx) => {
      people.push(
        <Person 
          name={pep.name}
          imageURL={pep.imageURL}
          key={idx}
        />
      )
    })
    return (
      <main>
        {people}
        <Person 
          name="Sheyna"
          imageURL=""
        />
      </main>
    )
  }
}

export default Main;
