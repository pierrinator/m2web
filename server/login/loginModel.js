var db = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var LoginUser = {
    createToken: function (User, callback) {
        db.query('select * from user where user_name=?', User.username, function (err, result, fields) {
    		if (err) throw err;
    		if(result.length <= 0)
    			callback(new Error('The user doesnt exist'));
    		else {
    			let isPasswordValid = bcrypt.compareSync(User.password, result[0].password);
    			if(!isPasswordValid)
    				callback(new Error('The password is wrong'));
    			else {
    				return db.query('select * from user where user_name=?', User.username, callback);	
    			}
    		} 
  		});
        
        
    }
}

module.exports = LoginUser;


