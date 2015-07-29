var mongoose = require('mongoose');
var Instance = require(__dirname + '/../../models/Instance.js');

module.exports = {

  get: function(req, res) {
    Instance.findOne({_id: req.params.instance}, function(err, data) {
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
  },

  put: function(req, res) {
    Instance.findOne({_id: req.params.instance}, function(err, instance) {
      if (err) {
        res.send(err);
      } else {
        if(req.decoded._id != instance.creator) {
          res.status(403).json({msg: 'User does not have access to this file'});
        } else {
          Instance.update(instance, req.body, function(err, numAff) {
            if (err) {
              res.send(err);
            } else {
              Instance.findOne({_id: req.params.instance}, function(err, instance) {
                if (err) {
                  res.send(err);
                } else {
                  res.send(instance);
                }
              });
            }
          });
        }
      }
    });
  }

};
