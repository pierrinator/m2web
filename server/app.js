var cors = require('cors');
var express = require('express');
var app = express();

var schoolController = require('./school/schoolController');
var registerController = require('./register/registerController');
var loginController = require('./login/loginController');

app.use(cors());
app.use('/school', schoolController);
app.use('/register', registerController);
app.use('/login', loginController);

module.exports = app;