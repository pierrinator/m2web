
var db = require('../db');

var User = {
    getUser: function(res)
    {
        res.status(404);
        //var username = req.body.username;
        //var password = req.body.password;
        console.log("username, password");
        //return db.query();

    },
    createUser: function (User, callback) {
        return db.query();
    }
}

module.exports = User;
