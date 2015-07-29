var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config')
var port = process.env.PORT || 3000;

mongoose.connect(config.database || process.env.MONGOLAB_URI || 'mongodb://localhost/game_test');

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
