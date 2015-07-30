var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = Schema({
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  phoneNumber: Number,
  url: String,
  openTime: String,
  closeTime: String,
  longitude: Number,
  latitude: Number,
  rating: Number,
  maxGames: Number
});

module.exports = mongoose.model('Location', locationSchema);
