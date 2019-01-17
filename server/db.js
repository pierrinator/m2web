const mysql   = require('mysql');

var connection = mysql.createConnection('xxxx');

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    
    console.log('Connected to the MySQL server.');
    connection.query(
            'Create table IF NOT EXISTS user (user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
            user_name VARCHAR(80) NOT NULL, password VARCHAR(100) NOT NULL)\
            ENGINE=INNODB;', function(err, results, fields) {
          if (err) {
              console.log(err.message);
          }
        });
    connection.query(
            'Create table IF NOT EXISTS school (school_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
            school_name VARCHAR(80) NOT NULL, main_field VARCHAR(80) NOT NULL, sub_field VARCHAR(80) NOT NULL,\
            academy VARCHAR(80) NOT NULL, region VARCHAR(80) NOT NULL, department VARCHAR(80) NOT NULL,\
            city VARCHAR(80) NOT NULL, type_diploma VARCHAR(80) NOT NULL, diploma_name VARCHAR(255) NOT NULL,\
            user_id INT NOT NULL, FOREIGN KEY(user_id) REFERENCES user(user_id))ENGINE=INNODB;', function(err, results, fields) {
    			if (err) {
      				console.log(err.message);
    			}
  			});

  });
  
setInterval(function () {
    connection.query('SELECT 1');
}, 30000);
  
module.exports=connection;