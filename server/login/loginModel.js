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
    				let access_token = jwt.sign({id: result[0].user_id}, 'super secret', {expiresIn: 86400}); // dure 24h
    				let res = {access_token: access_token, id: result[0].user_id};
    				
    				return callback(null, res);
    			}
    		} 
  		});
        
        
    }
}

module.exports = LoginUser;


