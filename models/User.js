var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: /^[a-z0-9]+$/,
    required: 'username is required, only lowercase letters and numbers allowed'
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: /[^ ]/,
    validate: [
      validator,
      'Password must be between 8 and 16 characters.'
    ]
  },
  email: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  city: String,
  state: String
});

function validator(v) {
  return 8 < v.length < 16;
}

userSchema.path('email').validate(function(email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email); // Assuming email has a text attribute
  }, 'The e-mail field cannot be empty.');

module.exports = mongoose.model('User', userSchema);
