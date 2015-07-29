//completed for now 7/27/15;
var mongoose = require('mongoose');
var User = require(__dirname + '/../../models/User.js');

module.exports = {

  get: function(req, res) {
    User.findOne({username: req.params.user}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding user', error: err});
      } else {
        res.json({success: true, msg: 'Get user successful', data: data});
      }
    });
  },

  put: function(req, res) {
    var currentUsername = req.params.user;
    User.findOne({username: currentUsername}, function(err, user) {
      if (currentUsername != req.decoded.username) {
        res.status(403).json(({success: false, msg: 'User requesting did not match user requested', error: err}));
      } else {
         if (err) {
          res.status(500).json(({success: false, msg: 'Error finding user', error: err}));
        } else {
          User.update(user, req.body, {new: true}, function(err, updatedUser) {
            if (err) {
              res.status(500).json(({success: false, msg: 'Error updating user', error: err}));
            } else {
              res.json({success: true, msg: 'User info updated successfully', data: updatedUser});
            }
          });
        }
      }
    });
  },

  delete: function(req, res) {
    User.remove({username: req.params.user}, function(err) {
      if (err) {
        res.status(500).json(({success: false, msg: 'Error deleting user', error: err}));
      } else {
        res.json({success: true, msg: 'User deleted successfully'});
      }
    });
  }

};
