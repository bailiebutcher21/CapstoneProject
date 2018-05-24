const express = require('express');
const bodyParser = require('body-parser');
const path = require ('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
// API file for interacting iwth Mongo
const api = require('./server/routes/api');
//Parsers
const url = 'mongodb://localhost:27017';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Angular DIST folder
app.use(express.static(path.join(__dirname, 'dist')));
//API Location
app.use('/api', api);

MongoClient.connect(url, function(err, res){
  if (err) throw err;
  const dbo = db.db("MovieRaterApp");
  dbo.createCollection("Movies", function(err, res){
    if (err) throw err;
    console.log("collection Created");
    db.close();
  })
});

//All other requests to Angular Ap;

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// Setting port
app.listen(4200, function(){
  console.log("The App Is running")
});
