var express  = require('express');
var mongoose = require('mongoose');
var userSchema   = require('./userSchema');
var jwt      = require('jsonwebtoken');

var app = express();
var router   = express.Router();

var config = require('../config');
app.set('superSecret', config.secret);


mongoose.connect('mongodb://localhost/users');
var user1 = mongoose.model('users', userSchema);



router.post('/auth/signUp',function(req,res){

    var newuser              = new user1();
    
   
    newuser.user.username                  = req.body.username;
    newuser.user.password                  = req.body.password;
    newuser.user.firstname                 = req.body.firstname;
    newuser.user.lastname                  = req.body.lastname;
    newuser.user.mobile                    = req.body.mobile;
    newuser.token =jwt.sign({ _id :newuser._id }, app.get('superSecret'), {
        expiresIn: 1440
    });

    newuser.save(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send({'success': true,'data':savedUser})
    });

});


router.post('/auth/login',function(req,res) {
    //var deviceId = req.body.deviceId;
    var username = req.body.username;
    var password = req.body.password;


    user1.findOne({'user.username' : username }, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!result) {
            console.log("user doesn't exit");
            return res.status(404).send();
        }

        result.comparePassword(password, function (err, isMatch) {
            if (isMatch && isMatch == true) {
                return res.status(200).send({'success': true, 'data': result});
            }
            else {
                return res.status(401).send();
            }

        });

    });

});

module.exports = router;
