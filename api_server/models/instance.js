var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instanceSchema = Schema({
  host: String,
  game: String,
  location: String,
  playersNeeded: Number,
  signedUp: Number,
  startDate: Date,
  startTime: String,
  playTime: String,
  date: {
    type: Date,
    default: Date.now
  },
  gameOver: {
    type: Boolean,
    default: false
  },
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  participants: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Instance', instanceSchema);
