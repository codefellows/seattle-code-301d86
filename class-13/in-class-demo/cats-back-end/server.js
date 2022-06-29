'use strict'

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');
// I must bring in a scheme if I want to interact with that model
const Cat = require('./models/cat.js');

// connect Mongoose to ouur MongoDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// USE
// implement express
const app = express();

// middleware
app.use(cors());
// must have this to receive JSON from a request!!!!
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/cats', getCats);
app.post('/cats', postCats);
// we must have path parameter. It will be the unknown id
// we will use a variable to capture that id
// to create that variabble we add ':<variable-name>' in place of the path value
app.delete('/cats/:id', deleteCats);
app.put('/cats/:id', putCats);

async function getCats(req, res, next) {
  try {
    let results = await Cat.find();
    res.status(200).send(results);
  } catch(error) {
    next(error);
  }
}

async function postCats(req, res, next) {
  console.log(req.body);
  try {
    let createdCat = await Cat.create(req.body);
    res.status(200).send(createdCat);
  } catch(error) {
    next(error);
  }
}

async function deleteCats(req, res, next) {
  let id = req.params.id;
  console.log(id);
  try {
    await Cat.findByIdAndDelete(id)
    res.status(200).send('cat deleted');
  } catch(error) {
    next(error);
  }
}

async function putCats(req, res, next) {
  let id = req.params.id;
  try {
    // updated data lives in the body of the request:
    let data = req.body;

    // findByIdAndUpdate method takes in 3 arguments
    // 1. id of the thing to update
    // 2. updated data object
    // 3. options object 
    let updatedCat = await Cat.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(200).send(updatedCat);

  } catch(error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
