'use strict';

console.log('our first server');

// REQUIRE
// In our server, we have to use 'require' instead of import'
// Here we will list the requirement for a server
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');

// We must include cors if we want to share resources over the web
const cors = require('cors');

// USE
// Once I have required something, we have to use it
// this is where we assign the reqired file a variable name
// React does this in one step with 'import', 
// it says we must use it and it assign it to a variable
// Express takes 2 steps: 'require' and 'use'
// This is just how Express works.
const app = express();
app.use(cors());

// define my PORT, validate that my .env file is working
const PORT = process.env.PORT || 3002;
// 3002 — if my server runs on 3002, I know something is wrong with my .env file or how I'm importing the values from it

// ROUTES
// We will use these to access our endpoints

// .get() is an express method. 
// it correlates to axios.get
// the first parameter is a URL in quote,
// the second is a callback function

app.get('/', (request, response) => {
  response.send('hello from our server!');
})

app.get('/hello', (request, response) => {
  console.log(request.query.name);
  let name = request.query.name;
  let lastName = request.query.lastName;
  // let fullName = `${name} ${lastName}`;
  response.send(`Hello ${name} ${lastName}!`);
});

app.get('/pet', (request, response) => {
  try {
    let speciesFromRequest = request.query.species;
    console.log(speciesFromRequest);
    let dataToGroom = data.find(pet => pet.species === speciesFromRequest);
    let dataToSend = new Pet(dataToGroom);
    response.send(dataToSend);
  } catch (error) {
    // if I have an error, it will create a new instance of the Error object that lives in Express
    next(error);
    // this iwll instanciate any error as a new error
  }
});

// catchall route — goes at the bottom of our routes
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES
class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.breed = petObject.breed;
  }
}

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 


// LISTEN
// start the server
// .listen() is an express methos that takes in a Port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
