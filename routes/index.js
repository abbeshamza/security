var express = require('express');
var passport = require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'login' });
});


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {

            passport.serializeUser(function(user, done) {
                done(null, user.id);
            });




            passport.deserializeUser(function(id, done) {
                User.findById(id, function(err, user) {
                    done(err, user);
                });
            });
            if (err) { return done(err); }
            if (!user) {
                console.log('unknown user');
                return done(null, false, { message: 'Incorrect username.' });
            }
            else{

                bcrypt.compare(password,user.password,function(err,isMatch){
                    if(err) {return callback(err);
                    }
                    if(isMatch)
                    {
                        console.log('password Ok');
                        return done(null, user);
                    }
                    else
                        return done(null, false, { message: 'Incorrect password.' });

                });

            }

        });
    }
));
router.post('/', passport.authenticate('local',{failureRedirect:'/',failureFlash:'Invalid username or password'}),function(req , res){


    console.log(req.user.username);
    console.log('Authentication successful');
    req.flash('success','You are logged in');
    if(req.user.username=='admin')
    {
        res.writeHead(301,
            {Location: 'http://localhost:4200'}
        );
        res.end();
    }
    else
    {
        res.render('home', { title: 'home' });

    }



});
router.get('/logout',function(req,res){
    req.logout;
    req.flash('success','Youhave logged out !');
    res.redirect('/');
})


module.exports = router;
