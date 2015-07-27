var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({secret: 'joshua'}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/game_test');

var apiRouter = express.Router();
var authRouter = express.Router();

require('./routes/users-routes')(apiRouter);
require('./routes/instance-routes')(apiRouter);

require('./routes/auth-routes')(authRouter);

app.use('/api', require('./routes/verify'));
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(port, function() {
  console.log('Server listening on ' + port);
});
