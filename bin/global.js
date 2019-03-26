const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const getPasswordHash = function (password) {
  crypto.scrypt(password, global.PASSHASH_SALT, 64, (err, derivedKey) => {
    if (err) throw err;
    return derivedKey.toString('base64');
  });
}

const authUser = function (req, res, next) {
  jwt.verify(req.headers.authorization, global.JWT_KEY, {
    maxAge: global.SESSION_TTL,
  }, function(err, decoded) {
    if (err) {
      return next(errorObject(400, 'Authorization failure', err));
    }
    req.session = decoded;
    next();
  });
}

const createToken = function (content) {
  return jwt.sign(content, global.JWT_KEY);
}

const errorObject = function (status, message, cause) {
  var ret = {status, message};
  if (cause != undefined) {
    ret.cause = cause;
  }
  return ret;
}

const rejectNotPost = function  (req, res, next) {
  if (req.method != 'POST') {
    return next(errorObject(400, 'Invalid API call.'));
  }
  console.log(req.headers["content-type"] === 'application/json')
  next();
}

module.exports = { getPasswordHash, authUser, createToken, errorObject, rejectNotPost };
