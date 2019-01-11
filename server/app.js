
var express = require('express');
var app = express();

var schoolController = require('./school/schoolController');
app.use('/school', schoolController);

module.exports = app;