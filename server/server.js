const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const calendar = require('../db/db-Jimmy/mongoSchema.js');

mongoose.connect('mongodb://localhost:27017/calendars', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 3004;

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Mongoose connected")
//   calendar.find({}, (err, res) => {
//     if (err) return console.error(err);
//     console.log("THIS IS RESPONSE",res);
//   })
// });


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/rooms/:listing_id', express.static(path.join(__dirname, '..', 'public')));
//app.use('/:placeid', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/api/:id', router.router);
// app.post('/api/:id', router);

function getStuff(listing_id, cb) {
  calendar.find({ listing_id }).exec(cb);
}

app.get('/api/:listing_id', (req, res) => {
  getStuff(req.params.listing_id, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.listen(port, () => console.log(`Node is listening on port ${port}!`));