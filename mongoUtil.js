var mongoose = require('mongoose');
var Instance = require('./models/Instance')

exports.autoMarkComplete = function() {
  // Check for instances that were created more than 24 hours ago.
  var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
  // i.e. "less than yesterday"
  Instance.update({date: {$lt: yesterday}, gameOver: false},
  {gameOver: true}, {multi: true}, function(err, numAffected) {
    if (err) {
      console.log({success: false, msg: 'Error updating instances', error: err});
    } else {
      console.log({success: true, msg: 'Successfully set gameOver to true', data: numAffected});
    }
  });
};

