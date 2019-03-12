var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var UsersModel=require('../models/userModel');
require('../passport')(passport,flash);
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

var path = require("path");

router.get('/', function(req, res) {
    var user = {};
    user.data= req.user;
    user.status= true;
    user.msg = "User Logged In Successfully!";
    res.json({user: user});
});

router.post('/userlogin' , passport.authenticate('local', {    
    successRedirect: '/api/',
    failureRedirect: '/login',
    failureFlash: true,
}));

module.exports = router;
