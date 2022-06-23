'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Require modules
const getPhotos = require('./modules/photos.js');

// USE
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/', (req, res) => {
  res.status(200).send('Hello there!');
});

app.get('/photos', getPhotos);


app.get('*', (req, res) => {
  res.status(404).send('These aren\'t the droids you\'re looking for');
});



// ERRORS
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
