var express = require('express');
var router = express.Router();


var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('inscription', { title: 'inscription' });
});

router.post('/', function(req, res, next) {
    var name =req.body.name;
    var username = req.body.username;
    var email =req.body.email;
    var password =req.body.password;


    //form validation
    req.checkBody('name','name field is required').notEmpty();
    req.checkBody('username','username field is required').notEmpty();
    req.checkBody('email','email field is required').notEmpty();
    req.checkBody('email','email not valid').isEmail();
    req.checkBody('password','password field is required').notEmpty();



    //check errors
    var errors = req.validationErrors();
    if (errors)
    {
        res.render('inscription',{
            errors : errors ,
            name : name,
            username : username,
            email : email ,
            password: password
        });
    }
    else
    {
        var user = new User({
            name : name,
            username : username,
            email : email ,
            password : password ,
            role : 'user'
        });

        // create user
User.createUser(user,function(err,newUser){
    if(err) throw  err;
    console.log(newUser);

});

        // success message
        req.flash('success','you are registered with success');
        res.location('/');
        res.redirect('/');
    }
});

module.exports = router;
