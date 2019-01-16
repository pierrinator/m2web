var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var LoginUser = require('./loginModel');

router.post('/', function (req, res) {
    LoginUser.createToken(req.body,function(err,success){
        if(err)
        {
        	if(err == 'Error: The user doesnt exist')
        		res.status(403).json({ message: err.message });
        	else if(err == 'Error: The password is wrong')
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