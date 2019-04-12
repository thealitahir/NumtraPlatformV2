/**
 * Created by Haniya on 11/12/2014.
 */

var express = require('express');
var router = express.Router();
var Resource = require('../models/resourceModel');
var Section = require('../models/sectionModel');
var Role = require('../models/rolesModel');
var Component = require('../models/componentModel');
var ObjectId = require("mongoose").Types.ObjectId;
var fs = require('fs');
var exec = require('child_process').exec;

router.get('/', function (req, res) {
    console.log('in get components');
    Component.aggregate([
        {
            $lookup: {
                from: "sections",
                localField: "section_id",
                foreignField: "_id",
                as: "section"
            }
        }

    ]).exec(function (err, results) {
        res.send({status: true, msg: 'Component found', data: results});
    })
    /* Role.findOne({_id: req.user.role}, function (err, role) {
        if (role.title == "Super Admin") {
            Component.aggregate([
                {
                    $lookup: {
                        from: "sections",
                        localField: "section_id",
                        foreignField: "_id",
                        as: "section"
                    }
                }

            ]).exec(function (err, results) {
                res.send({status: true, msg: 'Component found', data: results});
            })
        }
        else {
            components = [];
            role["pipelinePermissions"].map(function (a) {
                if (a["section_permissions"].length > 0) {
                    components = components.concat(a["section_permissions"])
                }
            });
            components = components.map(function (a) {
                return new ObjectId(a.id);
            })
            //Section.find({title: {$in: modules}}, function (err,docs) {
            Component.aggregate([
                {
                    "$match": {"_id": {$in: components}}
                },
                {
                    $lookup: {
                        from: "sections",
                        localField: "section_id",
                        foreignField: "_id",
                        as: "section"
                    }
                }

            ]).exec(function (err, results) {
                res.send({status: true, msg: 'Component found', data: results});
            });
        }

    }); */

});

router.get('/:id', function (req, res) {
    console.log('in get component ' + req.params.id);
    Component.findOne({_id: req.params.id}, function (err, component) {
        if (!err && component) {
            res.send({status: true, msg: 'Component found.', data:component});
        }
        else {
            res.send({status: false, msg: 'Component not found.', data:{}});
        }

    });
});

router.post('/saveComponent', function(req,res){
    console.log('save comonent');
    console.log(req.body);
    var body = req.body;

    var component = {};
    component.title = body.title;
    component.subType = body.subType;
    component.stageType = body.stageType;
    component.section_id = body.section_id;
    component.is_streaming = body.is_streaming;
    component.icon = body.icon;
    component.stage_attributes = body.stage_attributes;
    var path = '';
    if(component.stageType == 'sink'){
        path = 'E:\\bitbucket\\numtraplatformv2\\client\\projects\\Platform\\src\\app\\stages\\sinks';
    }
    else if (component.stageType == 'source'){
        path = 'E:\\bitbucket\\numtraplatformv2\\client\\projects\\Platform\\src\\app\\stages\\sources';
    }
    else if(component.stageType == 'transformation'){
        path = 'E:\\bitbucket\\numtraplatformv2\\client\\projects\\Platform\\src\\app\\stages\\transformation';
    }
    else{
        return;
    }
    var options = {cwd:path}
    Component.create(component, function (err, component) {
        if (!err) {
            exec("ng generate component "+ component.title.toLowerCase()+"-"+component.stageType,options,function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    res.send({status: true, msg: 'Component saved successfully.', component: component});
                }
            });
            
        }
        else {
            res.send({status: false, msg: 'Component not saved.'});
        }

    });
    
});

router.put('/updateComponent',function(req,res){
    console.log("in udate component");
    var body = req.body;
    console.log(body);
    Component.update({_id:body._id},body,function(err,data){
        if(err){
            res.send({status: false, msg: 'Component not updated.'});
        }
        else{
            console.log(data);
            res.send({status: true, msg: 'Component updated successfully.', component: data});
        }
    });
});
/* router.get('/', function (req, res) {
    Role.findOne({_id: req.user.role}, function (err, role) {
        if (role.title == "Super Admin") {
            Component.aggregate([
                {
                    $lookup: {
                        from: "sections",
                        localField: "section_id",
                        foreignField: "_id",
                        as: "section"
                    }
                }

            ]).exec(function (err, results) {
                res.send({status: true, msg: 'Component found', data: results});
            })
        }
        else {
            components = [];
            role["pipelinePermissions"].map(function (a) {
                if (a["section_permissions"].length > 0) {
                    components = components.concat(a["section_permissions"])
                }
            });
            components = components.map(function (a) {
                return new ObjectId(a.id);
            })
            //Section.find({title: {$in: modules}}, function (err,docs) {
            Component.aggregate([
                {
                    "$match": {"_id": {$in: components}}
                },
                {
                    $lookup: {
                        from: "sections",
                        localField: "section_id",
                        foreignField: "_id",
                        as: "section"
                    }
                }

            ]).exec(function (err, results) {
                res.send({status: true, msg: 'Component found', data: results});
            });
        }

    });

});
router.get('/:sectionId', function (req, res) {
    Component.aggregate([
        {
            "$match": {"_id": new ObjectId(req.params.sectionId)}
        },
        {
            $lookup: {
                from: "sections",
                localField: "section_id",
                foreignField: "_id",
                as: "section"
            }
        }
    ]).exec(function (err, results) {
        res.send({status: true, msg: 'Component found', data: results[0]});
    });
});
router.delete('/:id', function (req, res) {
    Component.findOne({_id: req.params.id}, function (err, component) {
        if (!err && component) {
            component.remove();
            res.send({status: true, msg: 'Component deleted successfully.'});
        }
        else {
            res.send({status: false, msg: 'Component not deleted.'});
        }

    });
});
router.put('/:id', function (req, res) {

    var component = {
        title: req.body.title,
        type: req.body.type,
        section_id: req.body.section_id
    };

    Component.update({_id: req.body.id}, component, function (err, component) {

        if (!err) {

            res.send({status: true, msg: 'Component updated successfully.', data: component});

        }
        else {
            res.send({status: false, msg: 'Component not updated.'});
        }


    });


});
router.post('/', function (req, res) {

    var body = req.body;

    var component = {};
    component.title = body.title;
    component.subType = body.subType;
    component.stageType = body.stageType;
    component.section_id = body.section_id;
    component.is_streaming = body.is_streaming;
    component.icon = body.icon;
    component.stage_attributes = body.stage_attributes;
    Component.create(component, function (err, component) {

        if (!err) {
            ctrl_name = component.subType + capitalizeFirstLetter(component.stageType) + 'Ctrl';
            ctrl_path = "public/controllers/"+get_ctrl_dir_path(component.stageType)+'/'+ctrl_name +'.js';
            fs.writeFile( ctrl_path, "//**Auto Generated file**\nangular.module('webApp.controllers')\n.controller('"+ctrl_name+ "',['$scope','$rootScope', function ($scope,$rootScope) {}]);", function (err) {
                if (err) throw err;
            });

            template_name = component.subType;
            template_path = "public/directiveTemplates/"+component.stageType +'/'+ template_name +'.html';
            fs.writeFile( template_path, "<!--**Auto Generated file**-->\n<h3>Auto Generated Template</h3>", function (err) {
                if (err) throw err;
            });
            res.send({status: true, msg: 'Component saved successfully.', component: component});
        }
        else {
            res.send({status: false, msg: 'Component not saved.'});
        }

    })


});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function get_ctrl_dir_path(type){
    type = type.toLowerCase();
    if(type == 'iot' || type == 'analytics'){
        return type;
    }
    else if(type == 'sink' || type == 'source' || type == 'transformation'|| type == 'extension'){
        return type + 's';
    }
    else if(type == 'datapreprocessing'){
        return '';
    }
} */


module.exports = router;
