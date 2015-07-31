var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Location({
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  phoneNumber: Number,
  url: String,
  openTime: String,
  closeTime: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  maxGames: Number,
  over21: Boolean
});

var miroTea = new Location({
  name: 'Miro Tea',
  streetAddress: '5405 Ballard Ave N.W.',
  city: 'Seattle',
  state: 'WA',
  zipCode: '98117',
  phoneNumber: '2067826832',
  url: 'http://mirotea.com/',
  openTime: '08:00',
  closeTime: '22:00',
  latitude: Number,
  longitude: Number,
  over21: false
});

