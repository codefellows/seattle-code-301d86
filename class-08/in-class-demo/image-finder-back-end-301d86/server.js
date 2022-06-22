'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// USE
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/', (req, res) => {
  res.status(200).send('Hello there!');
});

app.get('/photos', async (req, res, next) => {
  try {
    // the front will send a value to use to search for photos
    let searchQueryFromFrontEnd = req.query.searchQuery;

    // take that value and use it to construct a URL to make a request the API
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
    let results = await axios.get(url);
    // console.log(results.data);
    let groomedData = results.data.results.map(pic => new Photo(pic));
    res.status(200).send(groomedData);
  } catch (error) {
    next(error)
  }
})

app.get('*', (req, res) => {
  res.status(404).send('These aren\'t the droids you\'re looking for');
});

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

// ERRORS
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
