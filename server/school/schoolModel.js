
var db = require('../db');

var School = {
    getschools: function(callback)
    {
        return db.query('select * from school', callback);
    },
    getschool: function(Id, callback)
    {
        return db.query('select * from school where school_id=?', Id, callback);
    },
    createschool: function (School, callback) {
        return db.query('insert into school(school_name, main_field, sub_field, academy, region, department, city,\
         type_diploma, diploma_name) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [School.school_name, School.main_field, School.sub_field, School.academy, School.region, School.department,
          School.city, School.type_diploma, School.diploma_name], callback);
    },
    deleteschool: function (Id, callback) {
        return db.query('delete from school where school_id=?', Id, callback);
    }
}

module.exports = School;

