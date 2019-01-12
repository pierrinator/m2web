
var express = require('express');
var app = express();

var schoolController = require('./school/schoolController');
var userController = require('./user/userController');
app.use('/school', schoolController);
app.use('/login', userController);

module.exports = app;