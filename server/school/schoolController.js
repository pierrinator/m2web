var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var School = require('./schoolModel');

router.get('/', function (req, res) {
    School.getschools(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/:id', function (req, res) {
    School.getschool(req.params.id,function(err,row){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(row);
        }
    });
});

router.post('/', function (req, res) {
    School.createschool(req.body,function(err,success){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.send('School added succesfully !');
        }
    });
});

router.delete('/:id', function (req, res) {
    School.deleteschool(req.params.id,function(err,success){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.send('School deleted succesfully !');
        }
    });
});



module.exports = router;