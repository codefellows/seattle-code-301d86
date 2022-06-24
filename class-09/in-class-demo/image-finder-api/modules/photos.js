'use strict';

const axios = require('axios');

async function getPhotos(req, res, next){
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
};


function getPhotosByChaining(req, res, next){
  let searchQueryFromFrontEnd = req.query.searchQuery;
  
  // ---- axios refactor - another way to structur the get call per axios docs -----
  let url = `https://api.unsplash.com/search/photos`;
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQueryFromFrontEnd
  }

  axios.get(url, { params }) 
    .then(results => results.data.results.map(pic => new Photo(pic)))
    .then(groomedData => res.status(200).send(groomedData))
    .catch(error => console.log(error));
};

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

module.exports = getPhotos;