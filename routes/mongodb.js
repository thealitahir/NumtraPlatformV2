var express = require('express');
var router =  express.Router();
var request = require("request");
// var mongooselocal = require('mongoose');

router.post('/getdataSource',function(req,res){
    var uri ='mongodb://'+req.body.username+':'+req.body.password+'@'+req.body.hostaddress+':'+req.body.port+'/'+req.body.database;

    var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    assert = require('assert');
  
    MongoClient.connect(uri, function(err, client) {
      assert.equal(null, err);

      if(err){ 
        console.log('Could not connect to mongodb.');
        throw err;
      } else {
        var db = client.db(req.body.database);
        console.log("Connected correctly to server");
        if(req.body.query){
          var query = JSON.parse(req.body.query);
        } else {
          var query = '';
        }
        db.collection(req.body.collection).find(query).toArray(function(err, result) {  
          if (err) throw err;  
          setTimeout(function(){client.close();},500);
          res.send(result);
          });
      }
    });
});

module.exports = router;