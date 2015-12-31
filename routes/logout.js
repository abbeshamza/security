var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.logout;
    req.flash('success','You have logged out !');
    res.redirect('/');
});

module.exports = router;
