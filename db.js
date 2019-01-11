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
  });
  

module.exports=connection;