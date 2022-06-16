# Warm-Up Exercise

Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## app.js

```javascript
import React from 'react';
import Header from './Header.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      counter: 0
    };
  }

  addCount = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return(
      <>
        <button onClick={this.addCount}>Click Me</button>
        <p>{this.state.counter}<p>
        <Header title="the best counter app in the world!"/>
      </>
    )
  }
}

export default App;
```

## Header.js

```javascript
import React from 'react';
class Header extends React.Component {
  render(){
    return <h1>{this.props.title}</h1>
  }
}

export default Header;
```
