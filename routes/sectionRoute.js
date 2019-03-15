/**
 * Created by Haniya on 11/12/2014.
 */

var express = require('express');
var router =  express.Router();
var Resource = require('../models/resourceModel');
var Section = require('../models/sectionModel');
var Role = require('../models/rolesModel');
var ObjectId = require("mongoose").Types.ObjectId;

router.get('/', function (req, res) {
    Role.findOne({_id:req.user.role},function(err,role) {
        if (role.title == "Super Admin"){
            Section.aggregate([
                {
                    $lookup:
                    {
                        from: "resources",
                        localField: "resource_id",
                        foreignField: "_id",
                        as: "resource"
                    }
                }
            ]).exec(function(err, results){
                res.send({status:true,msg:'Sections found',data:results});
            });
        }
        else{
            sections1 = role["pipelinePermissions"].map(function(a){return new ObjectId(a.id)});
            sections2 = role["dashboardPermissions"].map(function(a){return new ObjectId(a.id)});
            sections = sections1.concat(sections2);
            console.log(sections);
            Section.aggregate([
                {
                    "$match": { "_id": {$in: sections}}
                },
                {
                    $lookup:
                    {
                        from: "resources",
                        localField: "resource_id",
                        foreignField: "_id",
                        as: "resource"
                    }
                }

            ]).exec(function(err, results){
                res.send({status:true,msg:'Sections found',data:results});
            });
        }

    });

});
router.get('/:sectionId', function(req, res) {
    Section.aggregate([
        {
            "$match": { "_id": new ObjectId(req.params.sectionId)}
        },
        {
            $lookup:
            {
                from: "resources",
                localField: "resource_id",
                foreignField: "_id",
                as: "resource"
            }
        }
    ]).exec(function(err, results){
        res.send({status:true,msg:'Section found',data:results[0]});
    });
});
router.delete('/:id',function(req,res){
    Section.findOne({_id: req.params.id},function(err, section){
        if(!err && section) {
            section.remove();
            res.send({status: true, msg: 'Section deleted successfully.'});
        }
        else {
            res.send({status: false, msg: 'Section not deleted.'});
        }

    });
});
router.put('/:resourceId', function (req, res) {

    var section={
        title:req.body.title,
        resource_id:req.body.resource_id

    };

    Section.update({_id:req.body.id},section, function (err, section) {

        if(!err) {

            res.send({status: true, msg: 'Section updated successfully.', data: section});

        }
        else {
            res.send({status: false, msg: 'Section not updated.'});
        }


    });





});
router.post('/', function (req, res) {

    var body = req.body;

    var section = {};
    section.title=body.title;
    section.resource_id = body.resource_id;

    Section.create(section, function (err,stage) {

        if(!err){
            res.send({status:true,msg:'Section saved successfully.',stage:stage});
        }
        else{
            res.send({status:false,msg:'Section not saved.'});
        }

    })




});

module.exports = router;
