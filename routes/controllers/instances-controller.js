var mongoose = require('mongoose');
var Instance = require(__dirname + '/../../models/Instance.js');
var User = require(__dirname + '/../../models/User.js');

module.exports = {

  get: function(req, res) {
    Instance.find({}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding instances', error: err});
      } else {

        res.json({success: true, msg: 'Get all instances successful', data: data});
      }
    });
  },

  post: function(req, res) {
    var instance = new Instance(req.body);
    instance.creator = req.decoded._id;
    User.findOneAndUpdate({_id: req.decoded._id}, {hosting: true,
      isCommitted: true}, function(err, numchanged) {
        if (err) {
          res.status(500).json({success: false, msg: 'Error finding host user', error: err});
        }
    });
    instance.save(function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error saving instance', error: err});
      } else {
        res.json({success: true, msg: 'Instance created successfully', data: data});;
      }
    });


  }

};
