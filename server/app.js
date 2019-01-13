
var express = require('express');
var app = express();

var schoolController = require('./school/schoolController');
var userController = require('./user/userController');
function myCors(req, res, nxt) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    if(req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        nxt();
    }
}
app.use(myCors);
app.use('/school', schoolController);
app.use('/login', userController);

module.exports = app;