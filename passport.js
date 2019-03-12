var UserModel=require('./models/userModel');
var LocalStrategy = require('passport-local').Strategy;
var configurations = require("./configurations");
var Roles = require('./models/rolesModel');

module.exports = function(passport,flash){
    passport.use(new LocalStrategy({
            passReqToCallback : true
        },

        function(req,username, password, done) {
           // console.log('passport file');
            UserModel.findOne({ username: username.toLowerCase()}, function (err, user) {

                if (err) { return done(err); }

                if (!user) {
                   // var message = 'User not found.';
                    return done(null, false, req.flash('message','User not found.'));
                }

                if(user.active == true){
                    user.comparePassword(password, function (err, isMatch) {
                        if (err) throw err;
                        if(isMatch){
                            return done(null, user);

                        }else{
                            return done(null, false, req.flash('message','Incorrect password.'));
                        }
                    });
                }
                else
                {
                    return done(null, false, req.flash('message', 'Sorry! You are not an active user'));
                }
            });
        }
    ));

    passport.use('local-register', new LocalStrategy({
            passReqToCallback : true
        },
        function(req,username, password,done) {
console.log('register func');
            UserModel.findOne({ username :  username }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                {
                    return done(err);
                }

                // check to see if there is already a user with that email
                if (user) {

                    return done(null, false, req.flash('message','Username already in use'));
                }
                else {
                    // if there is no user with that email
                    // create the user
                    var newUser  = new UserModel();

                    // set the user's local credentials

                    Roles.findOne({title:req.body.role}, function (err,docs) {
                        if(!err){
                            var role ;
                            if(!docs){
                                role = new Roles({title:'Admin',permissions_array:[],modules:[],permissions:[],pipelinePermissions:[],dashboardPermissions:[]});
                                role.save();
                            }else 
                                role = docs;

                            newUser.username = username;
                            newUser.password = password;
                            newUser.firstName = req.body.fname;
                            newUser.lastName = req.body.lname;
                            newUser.role=role._id;

                            newUser.active = false;
                            newUser.token = Math.floor((Math.random() * 100) + 54);    //generating token
                            // save the user
                            newUser.save(function(err,obj) {
                                if (err)
                                {
                                    return done(err);
                                }
                                return done(null,newUser);
                            });
                        }
                        else{
                            res.send({status:false,msg:'Error while finding roles.'});
                        }
                    });
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        // console.log('serialzieable');
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // console.log('deserialzieable');
        // console.log(id);
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
