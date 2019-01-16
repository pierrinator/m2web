var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var RegisterUser = require('./registerModel');

router.post('/', function (req, res) {
    RegisterUser.createUser(req.body,function(err,success){
        if(err)
        {
            res.status(500).json(err);
        }
        else{
            res.status(201).json(success);
        }
    });
});

module.exports = router;