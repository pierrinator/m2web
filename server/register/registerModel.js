var db = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var RegisterUser = {
    createUser: function (User, callback) {
        let hashedPassword = bcrypt.hashSync(User.password, 8);
        return db.query('insert into user(user_name, password) values (?, ?)',
         [User.username, hashedPassword], callback);
    }
}

module.exports = RegisterUser;

