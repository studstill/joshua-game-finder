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

userSchema.methods.createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.path('email').validate(function(email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email); // Assuming email has a text attribute
  }, 'The e-mail field cannot be empty.');

module.exports = mongoose.model('User', userSchema);
