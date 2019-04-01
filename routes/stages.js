var express = require('express');
var router =  express.Router();
var request = require("request");
// var Roles = require('../models/rolesModel');
var StageVersionModel = require("../models/stageVersionModel");
var PipelineVersion = require("../models/pipelineVersionModel");
var ObjectId = require("mongoose").Types.ObjectId;

router.post('/updateStage',function(req,res){
    var stagedata = req.body;
    console.log(req.body);
    //StageVersionModel.update({"name":"DBFS"}, { $set:{ "original_schema":stagedata.fileheader,"stage_attributes.url":stagedata.formdata.url, "stage_attributes.source_delimeter": stagedata.formdata.filedelimeter, "stage_attributes.file_type":  stagedata.formdata.filetype } }, function (err, sdata) {
    StageVersionModel.update({"name":stagedata.stageName}, {$set: stagedata['updatedata'] }, function (err, sdata) {
      if(!err) {
          console.log('updated successfully');
            res.send({status: true, msg: 'stage updated successfully.', data: sdata});
        }
        else {
          console.log('stage not saved.');
          res.send({status: false, msg: 'stage not saved.'});
        }
    });
})

router.post('/linkStages',function(req,res){
  console.log("in link Stages");
  var target=req.body.target;
  var source=req.body.source;
  StageVersionModel.findOne({name: source }, function (err, source) {
    if (!err) {
      StageVersionModel.update({"name": target}, { $set:{ "original_schema": source.original_schema} }, function (err, lsdata) {
        if(!err) {
            console.log('linkstage updated successfully');
            res.send({status: true, msg: 'linkstage updated successfully.', data: lsdata});
          }
          else {
            console.log('linkstage not saved.');
            res.send({status: false, msg: 'linkstage not saved.'});
          }
      });

    } 
    else {
        console.log('error in getting stagedata');
        res.send({status: false, msg: 'error in getting stagedata .'});
    }
  });
  
})

router.get('/stageSchema/:stage',function(req,res){
  StageVersionModel.findOne({name: req.params.stage }, function (err, stageschema) {
    if (!err) {
      res.send({status: true, msg: 'get stage schema successfully.', data: stageschema});
    } 
    else {
        console.log('error in getting stage schema .');
        res.send({status: false, msg: 'error in getting stage schema .'});
    }
  });

})

router.post('/getPipelineResult',function(req,res){   
  console.log('onPipelineData');
  console.log(req.body);
  io.emit('onPipelineData', req.body);
  res.send('OK');
});

router.post('/executePipeline',function(req,res,next){
  var data=req.body;
  console.log(data); 
  var url= CONFIGURATIONS.platformRequestApi +'/api/start/codegen';
  console.log(url);
  request({
  url: CONFIGURATIONS.platformRequestApi +'/api/start/codegen',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  json: data
  }, function(error, response, body) {
  console.log('add data response');
  console.log(body);
  res.send(body);

  });
});

router.post('/saveCanvasModel',function(req,res){
  PipelineVersion.update({_id:"5c51641b607a223b3ef0ea61"}, { $set:{ "model": req.body} }, function (err, lsdata) {
    if(!err) {
        console.log('canvas model updated successfully');
        console.log(lsdata);
        res.send({status: true, msg: 'linkstage updated successfully.', data: lsdata});
      }
      else {
        console.log('canvas model  not updated.');
        res.send({status: false, msg: 'linkstage not saved.'});
      }
  });
});

router.get('/getCanvasModel',function(req,res){
  PipelineVersion.findOne({_id:"5c51641b607a223b3ef0ea61"}).exec(function(err,data){
    if(err){
      console.log('Unable to get canvas model');
      res.send({status: false, msg: 'linkstage not saved.'});
    }
    else{
      console.log('canvas model found');
      res.send({status: true, msg: 'Canvas model found.', data: data});
    }
  });
});


module.exports = router;