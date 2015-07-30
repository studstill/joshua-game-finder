//completed for now 7/27/15;
var mongoose = require('mongoose');
var Location = require(__dirname + '/../../models/Location.js');
var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {

  get: function(req, res) {
    Location.find({}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding locations', error: err});
      } else {
        res.json({success: true, msg: 'Get all locations successful', data: data});
      }
    });
  },

  post: function(req, res) {
    var location = new Location(req.body);
    location.save(function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error saving new location', error: err});
      } else {
        res.json({success: true, msg: 'Successfully saved new location', data: data});
      }
    });
  }
};
