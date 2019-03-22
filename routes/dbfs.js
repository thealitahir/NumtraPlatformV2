var express = require('express');
var router =  express.Router();
var request = require("request");
// var Roles = require('../models/rolesModel');
//var StageVersionModel = require("../models/stageVersionModel");

// router.post('/updateStage',function(req,res){
//     console.log('update stage');
//     console.log(req.body);
// })

router.post('/getDataSource', function(req,res) {
    console.log('node routes');
    console.log(req.body);
    // var url= CONFIGURATIONS.dbfsDomain +'/api/2.0/dbfs/read';
    var url= req.body.domain +'/api/2.0/dbfs/read';
    console.log(url);
    request({
        url: url,
        method: 'GET',
        headers: {
        //  "token":  CONFIGURATIONS.dbfsToken
        // Authorization: " Bearer " + CONFIGURATIONS.dbfsToken 
        Authorization: " Bearer " + req.body.token  
        },
        // json: {"path": "/FileStore/tables/Items.csv"}
        json: {"path": req.body.path}
        }, function(error, response, body) {
            //console.log('read file response');
            //console.log(body);
            let data = body.data;  
            let buff = Buffer.from(data, 'base64');  
            let text = buff.toString('ascii');
            var filedata =[];
            filedata = text.split("\n");
            console.log();
            var fileheader=[];
            fileheader = filedata[0].split(",");
            filedata.shift();
            filedata.length =10;
            var fh=[];
            var fd=[];
            
            for(var i=0 ; fileheader.length > i; i++){
                var head= { 
                    field : String,
                    alias : String,
                    position : String,
                    type : String,
               };
                head.field = fileheader[i].split(":")[0];
                head.alias = fileheader[i].split(":")[0];
                head.type = fileheader[i].split(":")[1];
                head.position = i+1;
                fh.push(head);
            }
            console.log(fh);
            for(var j=0 ; j < filedata.length; j++){
                var fdobj={};
                for(var i=0 ; i < fh.length; i++){
                    var head = fh[i];
                    fdobj[head.field]= filedata[j].split(",")[i] ;  
                }
                fd.push(fdobj);               
            }
            var fdata={fileheader:fh, filedata:fd}    
                res.send(fdata);
    });
});

module.exports = router;