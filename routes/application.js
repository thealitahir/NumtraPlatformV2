var express = require('express');
var router =  express.Router();
var request = require("request");
var ApplicationModel = require('../models/applicationModel');
var ObjectId = require('mongodb').ObjectID;
var multer = require('multer');
const csv = require('csv-parser');
var fs = require('fs');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/platform');
    },
    filename:function(req,file,cb){
        //console.log(file);
        cb(null,file.originalname);
    }
});
var upload = multer({storage:store}).single('file');

router.post('/createApplication',function(req, res) {
    // var application = new ApplicationModel({name:req.body.appName ,parent_id:ObjectId(req.body.parentId),user_id:'567a95c8ca676c1d07d5e3e7' ,app_type: req.body.option ,app_data:{cores_per_node:4,ram_per_node:4,end_time:'',start_time:'', recurrence:'2',backEndHost:'',backEndPort:'', debug:true}});
   if(req.body.option === 'pipeline'){
       var application = new ApplicationModel({name:req.body.appName ,parent_id:ObjectId(req.body.parentId),user_id:'567a95c8ca676c1d07d5e3e7' ,app_type: req.body.option ,pipeline:{cores_per_node:4,ram_per_node:4,end_time:'',start_time:'', recurrence:'2',backEndHost:'',backEndPort:'', debug:true}});
    }
   if(req.body.option === 'folder'){
    var application = new ApplicationModel({name:req.body.appName ,parent_id:ObjectId(req.body.parentId),user_id:'567a95c8ca676c1d07d5e3e7' ,app_type: req.body.option ,folder:{name:req.body.appName}});
   }
   if(req.body.option === 'file'){
    var application = new ApplicationModel({name:req.body.appFile ,parent_id:ObjectId(req.body.parentId),user_id:'567a95c8ca676c1d07d5e3e7' ,app_type: req.body.option ,file:{name:req.body.appFile, path:req.body.filePath}});
   }
    
    application.save(function (err, app) {

        if(!err){
            res.send({status: true, msg: "application created successfully.", data: app});
        }
        else{
            res.send({status: false, msg: "Error while saving application.", data:{}});
        }
    });
});

router.get('/getApplications/:parentId', function(req,res) {
    // ApplicationModel.find({parent_id:req.params.parentId}, function (err,applications) {
    ApplicationModel.find({parent_id:req.params.parentId}, function (err,applications) {
        if(!err){
            res.send({status:true,msg:'applications found.',data:applications});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while finding applications.'});
        }
    });
});

router.get('/getPreviousApplications/:Id', function(req,res) {
    ApplicationModel.find({parent_id: req.params.Id},function(err,applications) {
        if(!err){
            res.send({status:true,msg:'applications found.',data:applications});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while finding applications.'});
        }
    });
});

router.post('/editApplication', function(req,res) {
    ApplicationModel.update({"_id": req.body.appid}, {$set: {'name': req.body.appName} }, function (err, applications) {
        if(!err){
            res.send({status:true,msg:'applications Updated.',data:applications});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while updating applications.'});
        }
    });
});

router.post('/deleteApplication', function(req,res) {
    ApplicationModel.remove({"_id": req.body._id}, function (err,applications) {

        if(!err && applications) {
            if(req.body.app_type == 'file'){
                var path = req.body.file.path;
                
                fs.unlink(path, (err) => {
                    if (err) throw err;
                    console.log(path+' was deleted');
                  });
            }
            res.send({status: true, msg: 'applications deleted successfully.', data: applications});
        }
        else{
            console.log('err');
            res.send({status:false,msg:'Error while deleting applications.'});
        }
    });
});

router.post('/upload',function(req,res){
    
    upload(req,res,function(err){
       
         return res.json({originalname:req.file.originalname,uploadname:req.file.filename, path:req.file.destination})
    });
});

router.post('/readAppFile', function(req,res){
var results = [];
fs.createReadStream(req.body.path)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            return res.json({filedata: results});
        });
});


module.exports = router;