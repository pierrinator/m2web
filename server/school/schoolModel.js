
var db = require('../db');

var School = {
    getschools: function(callback)
    {
        return db.query('select * from school', callback);
    },
    getschool: function(userId, callback)
    {
        return db.query('select * from school where user_id=?', userId, callback);
    },
    createschool: function (School, callback) {
        db.query('select * from school where school_name=? and main_field=? and sub_field=? and academy=?\
         and region=? and department=? and city=? and type_diploma=? and diploma_name=? and user_id=?',
         [School.school_name, School.main_field, School.sub_field, School.academy, School.region, School.department,
          School.city, School.type_diploma, School.diploma_name, School.user_id], function (err, result, fields) {
            if (err) throw err;
            if(result.length <= 0) {
                return db.query('insert into school(school_name, main_field, sub_field, academy, region, department, city,\
                type_diploma, diploma_name, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [School.school_name, School.main_field, School.sub_field, School.academy, School.region, School.department,
                School.city, School.type_diploma, School.diploma_name, School.user_id], callback);
            }
            else {
                callback(new Error('This already exists'));
            } 
        });   
    },
    deleteschool: function (Id, callback) {
        return db.query('delete from school where school_id=?', Id, callback);
    }
}

module.exports = School;

