//completed for now 7/27/15;
var mongoose = require('mongoose');
var User = require(__dirname + '/../../models/User.js');

module.exports = {

  get: function(req, res) {
    User.find({username: req.params.user}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },

  delete: function(req, res) {
    User.remove({username: req.params.user}, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({msg: 'deleted: ' + req.params.user});
      }
    });
  }

};
