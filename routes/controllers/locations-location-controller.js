//completed for now 7/27/15;
var mongoose = require('mongoose');
var Location = require(__dirname + '/../../models/Location.js');

module.exports = {

  get: function(req, res) {
    Location.findOne({name: req.params.location}, function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error finding location', error: err});
      } else {
        res.json({success: true, msg: 'Get location successful', data: data});
      }
    });
  },

  put: function(req, res) {
    var currentLocationName = req.params.location;
    Location.findOne({name: currentLocationName}, function(err, location) {
       if (err) {
        res.status(500).json(({success: false, msg: 'Error finding location', error: err}));
      } else {
        Location.update(location, req.body, function(err, numAffected) {
          if (err) {
            res.status(500).json(({success: false, msg: 'Error updating location', error: err}));
          } else {
            res.json({success: true, msg: 'Location info updated successfully'});
          }
        });
      }
    });
  },

  delete: function(req, res) {
    Location.remove({name: req.params.location}, function(err) {
      if (err) {
        res.status(500).json(({success: false, msg: 'Error deleting location', error: err}));
      } else {
        res.json({success: true, msg: 'Location deleted successfully'});
      }
    });
  }

};
