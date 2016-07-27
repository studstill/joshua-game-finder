var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
  duration: Number, //In minutes
  minPlayers: Number,
  maxPlayers: Number,
  timesPlayed: Number
});

module.exports = mongoose.model('Game', gameSchema);
