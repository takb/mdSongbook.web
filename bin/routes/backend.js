const express = require('express');
const db = require('../database');
const { rejectNotPost, authUser } = require('../global');

const router = express.Router();
router.all('/', rejectNotPost, function(req, res, next) {
  res.send('respond with a resource?' + db.blah);
});
module.exports = router;
