console.log('mdSongbook backend initializing');
require('./config');
const express = require('express');
const forceHttps = require('express-force-https');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const backendRoute = require('./routes/backend');
const userRoute = require('./routes/user');

const app = express();
// app.use(forceHttps());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist/')));
app.use('/backend', backendRoute);
app.use('/user', userRoute);
// Handle 404
app.use(function(req, res) {
  res.redirect("/");
});
// Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(req.app.get('env') === 'development' ? err : {message: err.message});
});
console.log('mdSongbook backend is running');
module.exports = app;
