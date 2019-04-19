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
    // var url= CONFIGURATIONS.dbfsDomain +'/api/2.0/dbfs/read';
    var url= req.body.domain +'/api/2.0/dbfs/read';
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

router.post('/getDataFiles', function(req,res) {
    // var url= CONFIGURATIONS.dbfsDomain +'/api/2.0/dbfs/read';
    var url= req.body.domain +'/api/2.0/dbfs/list';
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
                for(var i=0;i<data.length;i++){
                    var path = data[i].path.split('/');
                    nodesData.push({
                        name: path[path.length-1],
                        path:data[i].path,                    
                        hasChildren: data[i].is_dir
                      });
                }
            }
            
            res.send({files:nodesData})
            
    });
});

module.exports = router;