'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Cat = require('./models/cat.js');

async function seed() {
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}
  await Cat.create({
    name: 'Pat the Cat',
    color: 'Black and White',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Pat the Cat was added');

  await Cat.create({
    name: 'Garfield',
    color: 'orange',
    spayNeuter: true,
    location: 'Ohio'
  });
  console.log('Garfield was added');

  await Cat.create({
    name: 'Chaz',
    color: 'Black and Brindle',
    spayNeuter: false,
    location: 'Fort Lauderdale'
  });
  console.log('Chaz was added');
  mongoose.disconnect();
}

seed();
