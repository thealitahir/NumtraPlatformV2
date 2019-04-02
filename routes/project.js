var express = require('express');
var router =  express.Router();
var request = require("request");
var ProjectModel = require('../models/projectModel');

router.post('/createNewProject',function(req, res) {
    console.log(req.body);
    console.log(req.user._id);
    var project = new ProjectModel({name: req.body.projectName, user_id:req.user._id});
    project.save(function (err, project) {

        if(!err){

            res.send({status: true, msg: "Project created successfully.", data: project});
        }
        else{
            res.send({status: false, msg: "Error while saving project.", data:{}});
        }
    });
});

router.get('/getProjects', function(req,res) {
    console.log('getprojects');
    ProjectModel.find({user_id:req.user._id}, function (err,projects) {
        if(!err){
            //console.log(projects);
            res.send({status:true,msg:'projects found.',data:projects});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while finding Projects.'});
        }
    });
});

router.post('/editProject', function(req,res) {
    console.log('editproject');
    console.log(req.body);
    ProjectModel.update({"_id": req.body.pid}, {$set: {'name': req.body.projectName} }, function (err, projects) {
    //ProjectModel.find({user_id:req.user._id}, function (err,projects) {
        if(!err){
            //console.log(projects);
            res.send({status:true,msg:'Project Updated.',data:projects});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while updating Project.'});
        }
    });
});

router.post('/deleteProject', function(req,res) {
    ProjectModel.remove({"_id": req.body.pid}, function (err,projects) {

        if(!err && projects) {
            console.log(projects);
            res.send({status: true, msg: 'Role deleted successfully.', data: projects});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while deleting Project.'});
        }
    });
});


module.exports = router;