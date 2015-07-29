//completed for now 7/27/15;
var mongoose = require('mongoose');
var User = require(__dirname + '/../../models/User.js');
var jwt = require('jsonwebtoken');
var config = require('../../config')

module.exports = {

  get: function(req, res) {
    User.find({}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },

  post: function(req, res) {
    var user = new User(req.body);
    user.password = user.createHash(user.password);
    user.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        var token = jwt.sign(user, config.secret, {expiresInMinutes: 30});
        res.json({success: true, msg: 'Authentication successfull', token: token});
      }
    });
  }
};
