'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const verifyUser = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL)

app.get('/', (request, response) => {
  response.send('test request received')
});

// to use verification functionality, paste your existing code inside of this function:

/*
verifyUser(req, async (err, user) => {
  if (err) {
    console.error(err);
    res.send('invalid token');
  } else {
    // insert try catch logic here.  BE CAREFUL.  check syntax IMMEDIATELY
  }
});
*/

app.get('/books', handleGetBooks);

async function handleGetBooks(req, res) {
  // verify the user first before you allow them to make a request
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {

      try {
        const booksFromDb = await Book.find();
        if (booksFromDb.length > 0) {
          res.status(200).send(booksFromDb);
        } else {
          res.status(404).send('error');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }

    }
  });
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
