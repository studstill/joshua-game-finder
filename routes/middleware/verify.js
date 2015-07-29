var jwt = require('jsonwebtoken');
var config = require('../../config')


module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.status(403).json({success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({success: false, msg: 'No token provided'});
  }
};
