const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/movie-rater-master 2', (err, db) => {
    if (err) return console.log(err);
    closure(db);
  });
};

//Error Handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

//Response Handing
let response = {
  status: 200,
  data: [],
  message: null
};

router.get('/movies', (req, res) => {
  connection((db) => {
    db.collection("movies")
      .find()
      .toArray()
      .then((movies) => {
      response.data = movies;
      res.json(response);
      })
      .catch((err) => {
      sendError(err, res);
      });
  });
});

module.exports = router;
