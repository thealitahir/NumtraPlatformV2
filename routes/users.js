var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
require('../passport')(passport,flash);
var nodemailer = require('nodemailer');
var UsersModel=require('../models/userModel');
// var Parameters=require('../models/processParametersModel');
var ObjectId = require("mongoose").Types.ObjectId;
// var Graphs = require('../models/graphModel');
var Roles = require('../models/rolesModel');
// var credentials = require('../credentials');
// var smtpTransport = nodemailer.createTransport({
//     //secureConnection: false,
//     service: "hotmail",  // sets automatically host, port and connection security settings
//     tls: {
//           rejectUnauthorized: false
//     },
//     auth: {
//         user: credentials.username,
//         pass: credentials.password
//     }

// });

router.get('/', function(req, res) {
    console.log('getuserdetails');
    console.log(req.user);
    UsersModel.findOne({_id: req.user._id})
        .populate('role')
        .populate('company_id')
        .populate('process_parameters')
        .exec(function (err, userInfo) {
            console.log(userInfo);
            if(!err){

                var userData={
                    id:userInfo._id,
                    firstName:userInfo.firstName,
                    lastName:userInfo.lastName,
                    email:userInfo.username,
                    role:userInfo.role,
                    role_id:userInfo.role._id,
                    company:userInfo.company_id,
                    process_parameters:userInfo.process_parameters,
                    defaultCluster:userInfo.defaultCluster
                };
                res.send({status: true,data:userData});
            }
            else {
                res.send('Error in getting User');
            }
        });

});
router.get('/getUsersThroughRegex/:tag', function(req, res) {

    UsersModel.find({'firstName' : new RegExp(req.params.tag, 'i')}, function(err, docs){
       if(!err){
           res.send({status:true,data:docs, msg:'successful response'});

       }
        else {
           res.send({status:false,data:[], msg:'unsuccessful response'});
        }
    })

});

router.get('/get', function(req, res) {
    var criteria = {};
    if(typeof req.query.userId != 'undefined'){
        criteria._id = req.query.userId;
    }
    console.log(req.user)
    Roles.findOne({_id: req.user.role}, function (err, role) {
        if (role.title != "Super Admin") {
            criteria.company_id = req.user.company_id;
        }
        UsersModel.find(criteria)
            .populate('role')
            .populate('company_id')
            .exec(function (err, users) {
                if(!err){
                    res.send({data:users});
                }
                else {
                    res.send('Error in getting All User');
                }
            });
    });


});

router.post('/',function(req,res) {

    UsersModel.findOne({ username :  req.body.username.toLowerCase() }, function(err, user) {
        // if there are any errors, return the error
        if (err)
        {
            return done(err);
        }

        // check to see if there is already a user with that email
        if (user) {
            res.send({status:false,msg:'Username already in use'});
            //return done(null, false, req.flash('message','Username already in use'));
        }
        else {
            // if there is no user with that email
            // create the user
            var newUser  = new UsersModel();

            // set the user's local credentials
            Roles.findOne({_id:req.body.role}, function (err,docs) {
                if(!err){
                    newUser.username = req.body.username.toLowerCase();
                    newUser.password = req.body.password;
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;
                    newUser.role=docs._id;

                    newUser.active = req.body.active;
                    newUser.token = Math.floor((Math.random() * 100) + 54);    //generating token

                    // save the user
                    if (req.user != null){
                        Roles.findOne({_id:req.user.role},function(err,role) {
                            if(role.title == 'Super Admin'){
                                newUser.company_id = req.body.company_id;
                            }
                            else{
                                newUser.company_id = req.user.company_id;
                            }
                            newUser.save(function(err,obj) {
                                if (err)
                                {
                                    res.send({status:false,msg:'Error in saving user'});
                                }else {

                                    var link = 'http://' + req.headers.host + '/verify?token=' + newUser.token;

                                    //sending mail
                                    smtpTransport.sendMail(
                                        {
                                            //email options
                                            from: "Admin " + credentials.username, // sender address.
                                            to: req.body.firstName + "<" + req.body.username + ">", // receiver
                                            subject: "Registration Confirmation", // subject
                                            html: "Please Click on the link to verify your registeration:<br>" + link
                                        },
                                        function (error, response) {  //callback
                                            if (error) {
                                                res.send({status:false,msg:'Sorry username is not a valid email address'});
                                            } else {
                                                res.send({status:false,msg:'Please verify the link sent to your email'});
                                            }
                                            smtpTransport.close(); // shut down the connection pool, no more messages.
                                        });


                                }
                            });
                        });
                    }
                    else{
                        newUser.save(function(err,obj) {
                            if (err)
                            {
                                res.send({status:false,msg:'Error in saving user'});
                            }else {

                                var link = 'http://' + req.headers.host + '/verify?token=' + newUser.token;

                                //sending mail
                                smtpTransport.sendMail(
                                    {
                                        //email options
                                        from: "Admin " + credentials.username, // sender address.
                                        to: req.body.firstName + "<" + req.body.username + ">", // receiver
                                        subject: "Registration Confirmation", // subject
                                        html: "Please Click on the link to verify your registeration:<br>" + link
                                    },
                                    function (error, response) {  //callback
                                        if (error) {
                                            res.send({status:false,msg:'Sorry username is not a valid email address'});
                                        } else {
                                            res.send({status:false,msg:'Please verify the link sent to your email'});
                                        }
                                        smtpTransport.close(); // shut down the connection pool, no more messages.
                                    });


                            }
                        });
                    }
                }
                else{
                    res.send({status:false,msg:'Error while finding roles.'});
                }
            });
        }
    });

});

router.put('/',function(req,res){
    console.log(req.body)
    var user = req.body.data;
    UsersModel.update({_id:user._id},{firstName:user.firstName,lastName:user.lastName,role:user.role._id,company_id:user.company_id}, function (err, user) {
        if(!err) {
            res.send({status: true, msg: 'user updated successfully.', data: user});
        }
        else {
            res.send({status: false, msg: 'user not saved.'});
        }
    });
});

router.put('/update_password',function(req,res){
    var usr = req.body.data;
    console.log(usr);
    UsersModel.findOne({_id: usr.id}, function (err, user) {
        if (!err) {
            user.comparePassword(usr.password, function (err, isMatch) {
                if (err) throw err;
                if(isMatch){
                    if(usr.new_password == usr.confirm_password) {
                        user.password = usr.new_password;
                        bcrypt = require('bcrypt-nodejs');
                        SALT_WORK_FACTOR = 10;

                        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                            if (err) if (err) res.send({status: false, msg: 'Error while updating password', data: user});
                            bcrypt.hash(user.password, salt, null, function (err, hash) {
                                if (err) res.send({status: false, msg: 'Error while updating password', data: user});

                                // override the cleartext password with the hashed one
                                user.password = hash;
                                UsersModel.findByIdAndUpdate(user._id, user, {new: true}, function (err, updated_user) {
                                    if (!err) {

                                        req.session.destroy();
                                        req.logout();
                                        res.send({
                                            status: true,
                                            msg: 'password updated successfully.',
                                            data: updated_user
                                        });
                                    }
                                    else {
                                        res.send({status: false, msg: 'Error while updating password'});
                                    }
                                });

                            });
                        });

                    }
                    else{
                        res.send({status: false, msg: 'Password Mismatch.', data: user});
                    }
                }else{
                    res.send({status: false, msg: 'Incorrect existing password', data: user});
                }
            });

        }
        else {
            res.send({status: false, msg: 'user not found.'});
        }
    });


});

router.delete('/:userId',function(req,res){
    UsersModel.findOne({_id: ObjectId(req.params.userId)},function(err, user){
        if(!err && user) {
            user.remove();
            res.send({status: true, msg: 'user deleted successfully.'});
        }
        else {
            res.send({status: false, msg: 'user not deleted.'});
        }

    });
});

router.get('/getDashboardGraphs',function(req,res){
    Graphs.find({user_id: req.user._id},function(err, graphs){
        if(!err ) {
           
            res.send({status: true,graphs:graphs, msg: 'graphs retreived successfully.'});
        }
        else {
            res.send({status: false,graphs:'', msg: 'graphs not retreived successfully.'});
        }

    });
});
router.post('/addUserParameters',function(req,res){
  var parameters = new Parameters({parameters:req.body.parameters});
    parameters.save(function(err,param){
        if(!err ) {
            UsersModel.findByIdAndUpdate(req.user._id,{process_parameters:parameters._id},{new: true},function(err, user){
                if(!err){
                    res.send({status: true, msg: 'parameters added successfully'});

                }
                else{
                    res.send({status: false, msg: 'Error while adding parameters in user collection'});

                }
            })

        }
        else {
            res.send({status: false, msg: 'Error while adding parameters'});
        }
    })
});
router.post('/updateUserParameters',function(req,res){

            Parameters.findByIdAndUpdate(req.query._id,{parameters:req.body.parameters},{new: true},function(err, user){
                if(!err){
                    res.send({status: true, msg: 'parameters updated successfully'});

                }
                else{
                    res.send({status: false, msg: 'Error while updating parameters in'});

                }
            })



});



module.exports = router;
