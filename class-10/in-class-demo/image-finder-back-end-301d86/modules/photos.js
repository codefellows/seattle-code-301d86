'use strict';

const axios = require('axios');

let cache = {};


async function getPhotos(req, res, next) {
  try {
    // the front will send a value to use to search for photos
    let searchQueryFromFrontEnd = req.query.searchQuery;

    // create a key so we can give a label for the thing we are putting in the cache
    let key = searchQueryFromFrontEnd + 'Data';

   /// times now - timestamp = difference
   // diffrence how large of a difference is acceptable

    // Is the thing the user is requesting already in the cache?
    let acceptableTimeToCache = 1000 * 60 * 60 * 24 * 30;
    // let testTimeToCache = 1000 * 20;
    // console.log(acceptableTimeToCache);
    // 1000 millisecond in a second
    // 60 seconds in a min
    // 60 min in hour
    // 24 hours in a day
    // 30-ish days in a month
    if (cache[key] && Date.now() - cache[key].timestamp < acceptableTimeToCache) {
      // If it is already in the cache give them that data from cache
      console.log('It is in the cache already');
      res.status(200).send(cache[key].data);
    } else {
      // if it is not already in the cache make a new request to the API
      console.log('it is not in the cache, let\'s make a new request');
      // take that value and use it to construct a URL to make a request the API
      let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
      let results = await axios.get(url);
      // console.log(results.data);
      let groomedData = results.data.results.map(pic => new Photo(pic));

      // add this data to the cache
      cache[key] = {
        data: groomedData,
        timestamp: Date.now()
      } 

      res.status(200).send(groomedData);
    }
   
  } catch (error) {
    next(error)
  }
};


function getPhotosByChaining(req, res, next) {
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
