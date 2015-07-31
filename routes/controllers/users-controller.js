//completed for now 7/27/15;
var mongoose = require('mongoose');
var User = require(__dirname + '/../../models/User.js');
var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {

  get: function(req, res) {
    User.find({}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding users', error: err});
      } else {
        res.json({success: true, msg: 'Get all users successful', data: data});
      }
    });
  },

  post: function(req, res) {
    var user = new User(req.body);
    user.password = user.createHash(user.password);
    user.save(function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error saving new user', error: err});
      } else {
        var token = jwt.sign(user, process.env.SECRET, {expiresInMinutes: config.expires});
        res.json({success: true, msg: 'Authentication successful', token: token, data: data});
      }
    });
  }
};
