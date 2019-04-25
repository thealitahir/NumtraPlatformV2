var express = require('express');
var router = express.Router();
var request = require("request");
var CredentialProfile = require('../models/credentialProfileModel');
var ObjectId = require("mongoose").Types.ObjectId;

router.post('/createProfile',function(req,res){
    console.log('in create profile');
    console.log(req.body);
    var profile = req.body;
    var credential_profile = {};
    credential_profile.name = profile.name;
    credential_profile.domain = profile.domain;
    credential_profile.token = profile.token;
    credential_profile.user_id = req.user;
    CredentialProfile.create(credential_profile, function (err, result) {
        if (!err) {
          console.log("added profile");
          console.log(result);
          res.send({ status: true, msg: 'new profile added', data: result });
        }
        else {
          res.send({ status: false, msg: 'profile not saved.' });
        }
  
      });
});

router.get('/',function(req,res){
    CredentialProfile.find({},function(err,data){
        if(err){
            res.send({ status: false, msg: 'profile not found.' });
        }
        else{
            res.send({ status: false, msg: 'profiles found.', data:data });
        }
    });
});

router.post('/getClusters', function(req,res) {
    // var url= CONFIGURATIONS.dbfsDomain +'/api/2.0/dbfs/read';
    console.log("in get clusters");
    console.log(req.body);
    var url= req.body.domain +'/api/2.0/clusters/list';
    request({
        url: url,
        method: 'GET',
        headers: {
            Authorization: " Bearer " + req.body.token  
        },
        json: {"path": req.body.path}
    }, function(error, response, body) {
            var nodesData = [];
            if(body.files){
                var data = body.files;          
                console.log(body);''
            }
            
            //res.send({files:nodesData})
            
    });
});

module.exports = router;