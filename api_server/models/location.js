var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = Schema({
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  phoneNumber: String,
  url: String,
  email: String,
  openTime: String,
  closeTime: String,
  lat: Number,
  lon: Number,
  rating: Number,
  maxGames: Number,
  over21: Boolean
});

module.exports = mongoose.model('Location', locationSchema);
