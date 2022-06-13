import React from 'react';
import Person from './Person.js';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Person 
          name="Sheyna" homeTown="Seattle" hairColor="brown"
        />
        <Person name="Brentice"/>
        <Person name="Yari"/>
        <Person name="Kris"/>
        <Person name="Matthew"/>
        <Person name="Jamall"/>
      </main>
    )
  }
}

export default Main;
