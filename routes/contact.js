var express = require('express');
var nodemailer=require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'contact' });
});
router.post('/', function(req, res, next) {
    var sujet = req.body.subject;
    var messge = req.body.message;
var transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth: {
        user : 'projectmonitor18@gmail.com',
        pass : 'azerty12345678'
    }
});
    var  mailoption = {
        from : 'Project Monitor Site',
        to: 'abbes.hamza.2013@gmail.com', // list of receivers
        subject:   sujet, // Subject line
        text:  messge, // plaintext body
        html: '<p>'+ messge+ '<p>' // html body
    }
    transporter.sendMail(mailoption, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

});

module.exports = router;
