// This is where I will declare my schema
// declare was the data should look like
// Like the header on a table

'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extract the Schema property from the mongoose object
const { Schema } = mongoose;

const catSchema = new Schema ({
  // like the header of our table
  name: {type: String, required: true},
  color: {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location: {type: String, required: true}
});

// define our model
// this is what will give our database functionality. It will assign the predefined schema to shape our data.
// this method takes in two properties a string and a schema:
const CatModel = mongoose.model('Cat', catSchema);

module.exports = CatModel;
