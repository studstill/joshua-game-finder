var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instanceSchema = Schema({
  host: String,
  game: String,
  location: String,
  playersNeeded: Number,
  signedUp: Number,
  startTime: String,
  playTime: String,
  date: {
    type: Date,
    default: Date.now
  },
  gameOver: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Instance', instanceSchema);
