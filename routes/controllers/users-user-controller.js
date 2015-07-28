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

  put: function(req, res) {
    var currentUsername = req.params.user;
    User.findOne({username: currentUsername}, function(err, user) {
      console.log(currentUsername);
      console.log(req.decoded.username);
      if (currentUsername != req.decoded.username) {
        console.log('I\'m HERE NOW!');
        res.status(403).json({msg: 'Not allowed'});
      } else {
         if (err) {
          res.status(500).json({msg: 'Server error: ' + err});
        } else {
          User.update(user, req.body, function(err, nummAffected) {
            if (err) {
              res.status(500).json({msg: 'Server error: ' + err})
            } else {
              User.findOne({username: currentUsername}, function(err, user) {
                if (err) {
                  res.status(500).json({msg: 'Server error: ' + err})
                } else {
                  console.log(user);
                  res.json({msg: 'Updated: ' + user});
                }
              })
            }
          })
        }
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
