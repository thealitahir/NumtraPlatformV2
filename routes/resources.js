/**
 * Created by Haniya on 11/12/2014.
 */

var express = require('express');
var router =  express.Router();
var Resource = require('../models/resourceModel');
var Role = require('../models/rolesModel');

router.get('/', function (req, res) {
    Role.findOne({_id:req.user.role},function(err,role) {
        if (role.title == "Super Admin"){
            Resource.find({}, function (err,docs) {
                if(!err){
                    res.send({status:true,msg:'Resource found.',data:docs});
                }
                else{
                    res.send({status:false,msg:'Error while finding Resource.'});
                }
            });
        }
        else{
            modules = role["modules"].map(function(a){return a.label});
            Resource.find({title: {$in: modules}}, function (err,docs) {
                if(!err){
                    res.send({status:true,msg:'Resource found.',data:docs});
                }
                else{
                    res.send({status:false,msg:'Error while finding Resource.'});
                }
            });
        }

    });
});
router.get('/:resourceId', function(req, res) {
    Resource.findOne({_id:req.params.resourceId},function(err,resource){
        if(!err)
        {
            res.json({status : true, msg :'resource found.', data : resource});
        }
        else{
            res.json({status : false , msg :'Error in finding Resource'});
        }
    })
});
router.delete('/:id',function(req,res){
    Resource.findOne({_id: req.params.id},function(err, resource){
        if(!err && resource) {
            resource.remove();
            res.send({status: true, msg: 'Resource deleted successfully.'});
        }
        else {
            res.send({status: false, msg: 'Resource not deleted.'});
        }

    });
});
router.put('/:resourceId', function (req, res) {

    var resource={
        title:req.body.title,
        url:req.body.url

    };

    Resource.update({_id:req.body.id},resource, function (err, resource) {

        if(!err) {

            res.send({status: true, msg: 'Resource updated successfully.', data: resource});

        }
        else {
            res.send({status: false, msg: 'Resource not updated.'});
        }


    });





});
router.post('/', function (req, res) {

    var body = req.body;

    var resource = {};
    resource.title=body.title;
    resource.url=body.url;


    Resource.create(resource, function (err,stage) {

        if(!err){
            res.send({status:true,msg:'Resource saved successfully.',stage:stage});
        }
        else{
            res.send({status:false,msg:'Resource not saved.'});
        }

    })




});

module.exports = router;
