const mysql   = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'root',
    database : 'phpmyadmin'
});


connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
   
    console.log('Connected to the MySQL server.');
    connection.query(
            'Create table IF NOT EXISTS school (school_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
            school_name VARCHAR(80) NOT NULL, main_field VARCHAR(80) NOT NULL, sub_field VARCHAR(80) NOT NULL,\
            academy VARCHAR(80) NOT NULL, region VARCHAR(80) NOT NULL, department VARCHAR(80) NOT NULL,\
            city VARCHAR(80) NOT NULL, type_diploma VARCHAR(80) NOT NULL, diploma_name VARCHAR(120) NOT NULL)\
            ENGINE=INNODB', function(err, results, fields) {
    			if (err) {
      				console.log(err.message);
    			}
  			});

  });
  

module.exports=connection;