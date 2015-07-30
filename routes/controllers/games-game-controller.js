//completed for now 7/27/15;
var mongoose = require('mongoose');
var Game = require(__dirname + '/../../models/Game.js');

module.exports = {

  get: function(req, res) {
    Game.findOne({name: req.params.game}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding game', error: err});
      } else {
        res.json({success: true, msg: 'Get game successful', data: data});
      }
    });
  },

  put: function(req, res) {
    var currentGameName = req.params.game;
    Game.findOne({name: currentGameName}, function(err, game) {
       if (err) {
        res.status(500).json(({success: false, msg: 'Error finding game', error: err}));
      } else {
        Game.update(game, req.body, function(err, numAffected) {
          if (err) {
            res.status(500).json(({success: false, msg: 'Error updating game', error: err}));
          } else {
            res.json({success: true, msg: 'Game info updated successfully'});
          }
        });
      }
    });
  },

  delete: function(req, res) {
    Game.remove({name: req.params.game}, function(err) {
      if (err) {
        res.status(500).json(({success: false, msg: 'Error deleting game', error: err}));
      } else {
        res.json({success: true, msg: 'Game deleted successfully'});
      }
    });
  }

};
