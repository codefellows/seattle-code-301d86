'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001;

// This class will be used to fulfill requests for shopping lists later.
class List {

  // Read in the shopping list from our dummy data.
  // Eventually this dummy data could be replaced with
  // a method that will call the WeatherBit.io API for data.
  static shoppingList = require('./data/shopping-list.json');
  // the keyword 'static' makes shoppingList a static property that is only used by the class itself, and not by the object it creates.

  // Run the request through a constructor,
  // iterate through the lists array to find a list
  // who's name matches the type we are looking for
  constructor(type) {
    this.type = type;
    this.items = List.shoppingList.lists.find(list => list.listName === type).items;
  }

}

app.get('/', (request, response) => {
  response.send('hello from the home route!');
});

app.get('/bananas', (request, response) => {
  response.json({ 'bananas': 'are cool' });
});

app.get('/shoppingList', (request, response) => {
  const type = request.query.type;
  console.log('Query Parameters', request.query);
  console.log('Type:', type);

  // Create a new object by passing our request to the List class.
  const listResult = new List(type);
  console.log('Result: ', listResult);

  // Send the newly created List object in the response object.
  response.status(200).send(listResult);
});

app.get('/throw-an-error', (request, response) => {
  // When something bad happens, you can "throw" an error and the
  // error handler middleware will catch and handle it
  throw new Error('You did something really, really bad!');
});

// When you use a try-catch and an error "just happens" in your code,
// use the 'catch' to call upon the error handler and give the user something useful
app.get('/async-error', (request, response, next) => {
  try {
    let listThatDoesntExist = require('./this-list-does-not-exist.js');
    // we are generating an error on purpose
    // This shoud cause an error that'll end up in the catch() below
    response.send(listThatDoesntExist);
  } catch (error) {

    // next can be used to pass an error to express for the error middleware to handle
    next(error);

    // THESE are anti-patterns. DO NOT handle errors inline, this is not the Express way
    // response.status(500).send('error from async-error');
    // response.status(500).send(error.message);
  }
});

// Not Found
app.get('*', (request, response) => {
  response.status(404).send('not found');
});

// error handling middleware must be the last app.use()
app.use( (error, request, response, next )=>  {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
