
var db = require('../db');

var School = {
    getschools: function(callback)
    {
        return db.query('select * from school', callback);
    },
    createschool: function (School, callback) {
    	/* Create the table school if it doesn't exist */
    	db.query(
    		'Create table IF NOT EXISTS school (school_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
            school_name VARCHAR(80) NOT NULL, main_field VARCHAR(80) NOT NULL, sub_field VARCHAR(80) NOT NULL,\
            academy VARCHAR(80) NOT NULL, region VARCHAR(80) NOT NULL, department VARCHAR(80) NOT NULL,\
            city VARCHAR(80) NOT NULL, type_diploma VARCHAR(80) NOT NULL, diploma_name VARCHAR(80) NOT NULL)\
            ENGINE=INNODB');

    	/* Insert a new school record and returns the callback. */
        return db.query('insert into school(school_name, main_field, sub_field, academy, region, department, city,\
         type_diploma, diploma_name) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [School.school_name, School.main_field, School.sub_field, School.academy, School.region, School.department,
          School.city, School.type_diploma, School.diploma_name], callback);
    }
}

module.exports = School;

