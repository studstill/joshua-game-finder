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
        res.status(500).json({msg: 'Server Error: ' + err);
      } else {
        if(req.decoded._id != instance.creator) {
          res.status(403).json({msg: 'User does not have access to this file'});
        } else {
          Instance.update(instance, req.body, function(err, numAff) {
            if (err) {
              res.status(500).json({msg: 'Server Error: ' + err);
            } else {
              Instance.findOne({_id: req.params.instance}, function(err, instance) {
                if (err) {
                  res.json({msg: 'Error: ' + err);
                } else {
                  res.json(instance);
                }
              });
            }
          });
        }
      }
    });
  },

  join: function(req, res) {
    User.findOneAndUpdate({_id: req.decoded._id}, {isCommitted: true},
      function(err, numAffected) {
      if (err) throw err;
      console.log('Number affected: ' + numAffected);
    });
    Instance.findOne({_id: req.params.instance}, function(err, instance) {
      if (err) {
        res.status(500).json({msg: 'Server Error: ' + err);
      } else {
        instance.participants.push(req.decoded._id);
      }
    })
  },

  quit: function(req, res) {
    User.findOneAndUpdate({_id: req.decoded._id}, {isCommitted: false},
      function(err, numAffected) {
      if (err) throw err;
      console.log('Number affected: ' + numAffected);
    });
    Instance.findOneAndUpdate({_id: req.params.instance},
      {participants.pull(req.decoded._id)}, function(err, numAffected) {
      if (err) {
        res.status(500).json({msg: 'Server Error: ' + err);
      } else {
        res.json({msg: 'Successfully quit',success: true});
      }
    })
  }

};
