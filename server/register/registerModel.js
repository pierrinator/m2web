var db = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var RegisterUser = {
    createUser: function (User, callback) {
        let hashedPassword = bcrypt.hashSync(User.password, 8);
        db.query('select user_name from user where user_name=?', User.username, function (err, result, fields) {
    		if (err) throw err;
    		if(result.length <= 0) {
    			return db.query('insert into user(user_name, password) values (?, ?)',
         		[User.username, hashedPassword], callback);
    		}
    		else {
    			callback(new Error('The user already exists'));
    		} 
  		});
        
        
    }
}

module.exports = RegisterUser;

