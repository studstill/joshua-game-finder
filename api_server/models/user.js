const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
import { isEMail } from 'validator';

var userSchema = Schema({
  username: {
    type: { String, min: 6, max: 20 },
    unique: true,
    required: true,
    trim: true,
    match: /^[a-z0-9]+$/,
    required: 'Username is required, only lowercase letters and numbers allowed'
  },
  password: {
    type: { String, min: 8, max: 24 }
    required: true,
    match: /\w+$/,
    required: 'Password is required. Allowed characters are A-Z, a-z, and 0-9.'
  },
  email: {
    type: String,
    required: true,
    validate: [ isEmail, 'please provide a valid email address']
  },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  hosting: {
    type: Boolean,
    default: false
  },
  isCommitted: {
    type: Boolean,
    default: false
  },
});

userSchema.methods.createHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
}

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateFindHash = function(cb) {
  var tries = 0;
  var timeout;
  var _generateFindHash = () => {
    var hash = crypto.randomBytes(32);
    this.findHash = hash.toString('hex');
    this.save((err) => {
      if (err) {
        if (tries > 9) {
          return cb(new Error('could not generate hash'));
        }
        return timeout = setTimeout(() => {
          _generateFindHash();
          tries++;
        }, 1000);
      }

      if (timeout) clearTimeout(timeout);
      cb(null, hash.toString('hex'));
    });
  };
  _generateFindHash();
};

userSchema.methods.generateToken = function(cb) {
  this.generateFindHash((err, hash) => {
    if (err) return cb(err);
    cb(null, jwt.sign({ idd: hash }, process.env.APP_SECRET));
  });
};

module.exports = mongoose.model('User', userSchema);
