//completed for now 7/27/15;
var mongoose = require('mongoose');
var Game = require(__dirname + '/../../models/Game.js');
var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {

  get: function(req, res) {
    Game.find({}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding games', error: err});
      } else {
        res.json({success: true, msg: 'Get all games successful', data: data});
      }
    });
  },

  post: function(req, res) {
    var game = new Game(req.body);
    game.save(function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error saving new game', error: err});
      } else {
        res.json({success: true, msg: 'Successfully saved new game', data: data});
      }
    });
  }
};
