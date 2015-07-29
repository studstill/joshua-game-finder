var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://lookingforgame:joshuaapp@ds033499.mongolab.com:33499/looking_for_game' || 'mongodb://localhost/game_test');
//process.env.MONGOLAB_URI
var apiRouter = express.Router();
var authRouter = express.Router();

require('./routes/users-routes')(apiRouter);
require('./routes/instance-routes')(apiRouter);

require('./routes/auth-routes')(authRouter);

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(express.static(__dirname + '/public')); //tells localhost to look for an HTML file to serve in the '/folder'

app.listen(port, function() {
  console.log('Server listening on ' + port);
});

module.exports = app;
