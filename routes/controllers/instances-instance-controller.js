var mongoose = require('mongoose');
var Instance = require(__dirname + '/../../models/Instance.js');

module.exports = {

  get: function(req, res) {
    Instance.find({_id: req.params.instance}, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },

  delete: function(req, res) {
    Instance.remove({_id: req.params.instance}, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({msg: 'deleted: ' + req.params.instance});
      }
    });
  }

};
