var express = require('express');
var router =  express.Router();
var request = require("request");
// var Roles = require('../models/rolesModel');
var StageVersionModel = require("../models/stageVersionModel");

router.post('/updateStage',function(req,res){
    var stagedata = req.body;
    console.log(req.body);
    StageVersionModel.update({"name":"DBFS"}, { $set:{ "original_schema":stagedata.fileheader,"stage_attributes.url":stagedata.formdata.url, "stage_attributes.source_delimeter": stagedata.formdata.filedelimeter, "stage_attributes.file_type":  stagedata.formdata.filetype } }, function (err, sdata) {
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
  var target=req.body.data.target;
  var source=req.body.data.source;
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
      console.log('schema successfully got');
      //console.log(stageschema);
      res.send({status: true, msg: 'get stage schema successfully.', data: stageschema});
    } 
    else {
        console.log('error in getting stage schema .');
        res.send({status: false, msg: 'error in getting stage schema .'});
    }
  });

})

module.exports = router;