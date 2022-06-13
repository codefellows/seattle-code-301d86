import React from 'react';

class Person extends React.Component {
  render() {
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>Text goes here</p>
      </article>
    )
  }
}

export default Person;
