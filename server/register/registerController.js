var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var RegisterUser = require('./registerModel');

router.post('/', function (req, res) {
    RegisterUser.createUser(req.body,function(err,success){
        if(err)
        {
        	if(err == 'Error: The user already exists')
        		res.status(403).json({ message: err.message });
        	else
            	res.status(500).json(err);
        }
        else{
            res.status(201).json(success);
        }
    });
});

module.exports = router;