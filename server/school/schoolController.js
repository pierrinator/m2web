var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var School = require('./schoolModel');

router.get('/', function (req, res) {
    School.getschools(function(err,rows){
        if(err) {
            res.status(500).json(err);
        }
        else
        {
            res.status(200).json(rows);
        }
    });
});

router.get('/:id', function (req, res) {
    School.getschool(req.params.id,function(err,row){
        if(err) {
            res.status(500).json(err);
        }
        else
        {
            res.status(200).json(row);
        }
    });
});

router.post('/', function (req, res) {
    School.createschool(req.body,function(err,success){
        if(err)
        {
            if(err == 'Error: This already exists')
                res.status(208).json({ message: err.message });
            else
                res.status(500).json(err);
        }
        else{
            res.status(201).json(success);
        }
    });
});

router.delete('/:id', function (req, res) {
    School.deleteschool(req.params.id,function(err,success){
        if(err)
        {
            res.status(500).json(err);
        }
        else{
            res.status(200).json(success);
        }
    });
});



module.exports = router;