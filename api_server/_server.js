const express = require('express');
const app = express();
const gameRouter = require(__dirname + '/routes/game_routes');
const instanceRouter = require(__dirname + '/routes/instance_routes');
const locationRouter = require(__dirname + '/routes/location_routes');
const userRouter = require(__dirname + '/routes/user_routes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

app.use('/api', gameRouter);
app.use('/api', instanceRouter);
app.use('/api', locationRouter);
app.use('/auth', userRouter);

//tells localhost to look for an HTML file to serve in the '/folder'
// app.use(express.static(__dirname + '/public'));

// resolve CORS issues in Chrome:
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH');
  next();
});


// Every 15 minutes run autoMarkComplete
// TODO setup heroku recurring job setintervals don't work as expected
setInterval(function() {
  require('./mongoUtil').autoMarkComplete();
}, 900000);

// the following is for the testing server
module.exports = exports = {
  server: {
    close: function() {
      throw new Error('Server not started yet!');
    }
  },
  listen: function(port, mongoString, cb) {
    console.log('mongoString', mongoString);
    console.log('port from _server.js:', port);
    mongoose.connect(mongoString);
    return this.server = app.listen(port, cb);
  },
  // close function is so tests can close the test server
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
