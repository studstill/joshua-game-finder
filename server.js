var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/game_test');

var apiRouter = express.Router();

require('./routes/users-routes')(apiRouter);

app.use('/api', apiRouter);


app.listen(port, function() {
  console.log('Server listening on ' + port);
});
