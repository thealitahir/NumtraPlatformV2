var express = require('express');
var router =  express.Router();
var request = require("request");
var mongoose = require('mongoose');

router.post('/getdataSource',function(req,res){
    var uri ='mongodb://'+req.body.username+':'+req.body.password+'@'+req.body.hostaddress+':'+req.body.port+'/'+req.body.database;

    mongoose.connect(uri,{ useNewUrlParser: true }, function(err, mongodatabase) {
        if(err){ 
          console.log('Could not connect to mongodb.');
          throw err;
        } else {
          var mongodb = mongodatabase;
          if(req.body.query){
            var query = JSON.parse(req.body.query);
          } else {
             var query = '';
          }
          console.log(query);
          mongodb.collection(req.body.collection).find(query).toArray(function(err, result) {  
            if (err) throw err;  
            
            res.send(result);
            //  
           // setTimeout(function(){mongodb.close();},5000);
            });
        }
      });
});


module.exports = router;