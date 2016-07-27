const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Forbidden - cannot authenticate.' });

    User.findOne({ findHash: decoded.idd }, (err, data) => {
      if (err) return res.status(403).json({ msg: 'Forbidden - cannot authenticate.' });
      if (!data) return res.status(403).json({ msg: 'Forbidden - cannot authenticate.' });
      req.user = data;
      next();
    });
  });
};
