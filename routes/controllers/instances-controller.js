var mongoose = require('mongoose');
var Instance = require(__dirname + '/../../models/Instance.js');

module.exports = {

  get: function(req, res) {
    Instance.find({}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },

  post: function(req, res) {
    var instance = new Instance(req.body);
    instance.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  }

};
