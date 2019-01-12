
var db = require('../db');

var School = {
    getschools: function(callback)
    {
        console.log('ntm');
        return db.query();
    },
    createschool: function (School, callback) {
        return db.query();
    }
}

module.exports = School;
