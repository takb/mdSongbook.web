const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');
const { rejectNotPost, authUser, createToken, errorObject, getPasswordHash } = require('../global');

const userDocKeyPrefix = 'user::';

router.all('/', rejectNotPost, authUser, function(req, res, next) {
  res.send(req.session);
  db.get(userDocKeyPrefix + req.body.user, function(err, doc) {
    if (err) {
      if (err.code === 13) {
        return next(errorObject(401, 'User does not exist.'));
      }
      return next(errorObject(500, 'Failed to read user data.', err));
    }
    res.send({
      doc
    });
  });
});

router.all('/login', rejectNotPost, function(req, res, next) {
  if (req.body.user == undefined) {
    return next(errorObject(400, 'Username must be set.'));
  }
  if (req.body.password == undefined) {
    return next(errorObject(400, 'Password must be set.'));
  }
  db.get(userDocKeyPrefix + req.body.user, function(err, doc) {
    if (err) {
      if (err.code === 13) {
        return next(errorObject(401, 'User does not exist.'));
      }
      return next(errorObject(500, 'Failed to read user data.', err));
    }
    if (doc.value.password !== req.body.password) {
    // if (doc.value.password !== getPasswordHash(req.body.password)) {
      return next(errorObject(401, 'Password does not match.'));
    }
    console.log(getPasswordHash(req.body.password))
    var token = createToken({
      name: req.body.user
    });
    res.send({
      token: token
    });
  });
});

router.all('/api/user/signup', function(req, res) {
  var user = req.body.user;
  var password = req.body.password;

  var userDocKey = 'user::' + user;
  var userDoc = {
    name: user,
    password: password,
    flights: []
  };

  bucket.insert(userDocKey, userDoc, function(err, doc) {
    if (err) {
      if (err === couchbase.errors.KEY_EEXISTS) {
        res.status(409).send({
          error: 'User already exists.'
        });
        return;
      }

      res.status(500).send({
        error: err
      });
      return;
    }

    var token = jwt.sign({
      user: user
    }, JWT_KEY);

    res.send({
      data: {
        token: token
      },
      context: ['created document ' + userDocKey]
    });
  });
});

module.exports = router;
