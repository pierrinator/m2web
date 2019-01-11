
var db = require('../db');

var School = {
    getschools: function(callback)
    {
        return db.query();
    },
    createschool: function (School, callback) {
        return db.query();
    }
}

module.exports = School;
