module.exports = exports = function(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const namePassword = authHeader.split(' ')[1];
    const namePassBuf = new Buffer(namePassword, 'base64');
    const namePassPT = namePassBuff.toString();
    namePassBuf.fill(0);
    const namePassArr = namePassPT.split(':');
    req.auth = {
      name: namePassArr[0],
      email: namePassArr[1],
      password: namePassArr[2]
    };
    if (req.auth.name.lenght < 6 || req.auth.email.length < 4 || req.auth.password.length < 8) throw new Error('Needs valid Name, Email or Password'); // eslint-disable-line
  } catch(e) {
    console.log(e);
    return res.status(500).json({ msg: 'Error. Could not authenticate.' });
  }
  next();
};
