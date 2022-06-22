# Warm-Up Exercise

Examine the code below. Add a function to your React code that makes a call to your server using the 'axios' libraray as soon as the component mounts, on the '/bananas' route. Update the state of 'bananas' with the results that you get back.

## app.js

```javascript
import React from 'react';

const SERVER = 'http://localhost:3001';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      bananas = ''
    }
  }

  render() {
    return(
      <div className="app">
        <h1>Bananas!</h1>

        {this.state.bananas &&
          <p>{this.state.bananas}</p>
        }
      </div>
    )
  }
}

export default App;
```

## server.js

```javascript
'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/bananas', (request, response) => response.send('bananas are great'));

app.listen(3001);
```
