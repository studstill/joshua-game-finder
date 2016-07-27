const Router = require('express').Router;
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const authHttp = require(__dirname + '/../lib/auth_http');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const errorHandler = require(__dirname + '/../lib/db_error_handler');

var authenticationRouter = module.exports = exports = Router();

authenticationRouter.post('/signup', bodyParser, (req, res) => {
  if (req.body.username.length < 6) {
    return res.status(400).json({ msg: 'Invalid username' });
  }
  if (req.body.password < 8) {
    return res.status(400).json({ msg: 'Invalid password' });
  }
  if (req.body.email === '' || req.body.email.indexOf('@') < 1 || req.body.email.indexOf('.') < 2) {
    return res.status(400).json({ msg: 'Invalid email' });
  }
  User.find({ 'email': req.body.email }, (err, docs) => {
    if (err) return errorHandler(err);
    if (docs.length > 0) {
      return res.status(400).json({ msg: 'Invalid email' })
    }
  });
  User.find({ username: req.body.username }, (err, docs) => {
    if (err) return errorHandler(err);
    if (docs.length > 0) {
      return res.status(400).json({ msg: 'That username is taken' });
    }
  });
  var newUser = new User(req.body);
  req.body.email = null;
  var password = req.body.password;
  newUser.createHash(password);
  req.body.password = null;
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(400).json({ msg: 'Could not create user. Try sign-in later.' });

    user.generateToken((err, token) => {
      if (err) return res.status(400).json({ msg: 'Could not generate security token. Please try again later.' });
      return res.status(200).json({ msg: 'Signup complete!', token: token });
    });
  });
});

authenticationRouter.get('/signin', authHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(401).json({ msg: 'There was an error during sign-in, please try again.' });
    if (!user) return res.status(401).json({ msg: 'Invalid username.' });
    if (!user.compareHash(req.auth.password)) return res.status(401).json({ msg: 'Invalid password' });
    user.generateToken((err, token) => {
      if (err) return res.status(401).json({ msg: 'Could not generate security token. Please try again later.'});
      return res.status(200).json({ msg: 'Successful sign-in!', token: token });
    });
  });
});

authenticationRouter.get('/userprofile', jwtAuth, (req, res) => {
  res.send({ email: req.user.email });
});
