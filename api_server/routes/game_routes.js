const Router = require('express').Router;
const Games = require(__dirname + './../models/game');
const bodyParser = require('body-parser').json();
const errorHandler = require('./../lib/db_error_handler');
const http = require('http');

const gameRouter = module.exports = Router();

// set up route for user generated game data
gameRouter.post('/games', bodyParser, (req, res) => {
  var newGame = new Games(req.body);
  newGame.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

gameRouter.get('/games', (req, res) => {
  Games.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

// for updating game info
gameRouter.put('/games/:id', bodyParser, (req, res) => {
  var gameData = req.body;
  delete gameData._id; // recommended in the Mongoose docs to prevent _id collisions
  Games.update({ _id: req.params.id }, gameData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(gameData);
  });
});

// game data will be beyond repair
gameRouter.delete('/trails/:id', (req, res) => {
  Games.remove({ _id: req.params.id }, (err) => {
    res.status(200).json({ msg: 'Game has been removed.' });
  });
});
