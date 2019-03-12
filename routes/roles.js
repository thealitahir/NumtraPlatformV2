
var express = require('express');
var router =  express.Router();
var Roles = require('../models/rolesModel');
// var _ = require('underscore');
// var ldap = require('ldapjs');
var client = ""; //ldap.createClient({url: 'ldap://192.168.23.109:389'});

router.get('/getUserRoles', function(req, res) {
    console.log(req.user);
    Roles.findOne({_id:req.user.role},function(err,role) {
        if (role.title == "Super Admin"){
            Roles.find({}, function (err, docs) {
                if (!err) {
                    res.send({status: true, msg: 'User roles found.', data:docs});
                }
                else {
                    res.send({status: false, msg: 'Error while finding roles.'});
                }
            });
        }
        else{
            Roles.find({user_id: req.user._id}, function (err, docs) {
                if (!err) {
                    res.send({status: true, msg: 'User roles found.', data:docs});
                }
                else {
                    res.send({status: false, msg: 'Error while finding roles.'});
                }
            });
        }

    });
});

router.get('/', function (req, res) {

    Roles.find({}, function (err,docs) {
        if(!err){
            res.send({status:true,msg:'roles found.',data:docs});
        }
        else{
            res.send({status:false,msg:'Error while finding roles.'});
        }
    });
});

router.get('/getById/:id', function (req, res) {
    Roles.findOne({_id:req.params.id}, function (err,docs) {
        if(!err){
            res.send({status:true,msg:'role found.',data:docs});
        }
        else{
            res.send({status:false,msg:'Error while finding roles.'});
        }
    });
});
router.get('/getByName/:name', function (req, res) {
    Roles.findOne({title:req.params.name}, function (err,docs) {
        if(!err){
            res.send({status:true,msg:'role by name found.',data:docs});
        }
        else{
            res.send({status:false,msg:'Error while finding role by name.'});
        }
    });
});

router.delete('/:id',function(req,res){
    Roles.findOne({_id: req.params.id},function(err, role){
        if(!err && role) {
            role.remove();
            res.send({status: true, msg: 'Role deleted successfully.'});
        }
        else {
            res.send({status: false, msg: 'Role not deleted.'});
        }

    });
});

router.get('/:roleId', function(req, res) {
    Roles.findOne({_id:req.params.roleId},function(err,role){
        if(!err)
        {
            res.json({status : true, msg :'Role found.', data : role});
        }
        else{
            res.json({status : false , msg :'Error in finding Role'});
        }
    })
});

router.post('/', function (req, res) {

    var body = req.body;
    //var DN = 'cn=admin,dc=platalytics,dc=com';
    //
    ////adding role as 'group' to ldap server
    //client.bind(DN, '123', function (err) {
    //    if(err){
    //        cb(err === null, err);
    //        client.unbind();
    //    }
    //    else{
    //
    //        var entry = {
    //            member:'cn=dummy,ou=users,dc=platalytics,dc=com',
    //            objectclass: ['groupOfNames']
    //        };
    //
    //        client.add('cn='+body.title+',ou=groups,dc=platalytics,dc=com', entry, function(err) {
    //            if(err){
    //                cb(err === null, err);
    //                client.unbind();
    //                res.send({status:false,msg:'Error in adding group to LDAP'});
    //            }
    //            else{
                    var modules=[];

                    for(var i=0;i<body.modules.length;i++){
                        modules.push({
                            name:'',
                            permissions:[]
                        });

                        modules[i].name=body.modules[i].name;
                        for(var j=0;j<body.modules[i].selectedPermissions.length;j++) {
                            var selectedPermission = body.modules[i].selectedPermissions[j].label.toLowerCase();
                            modules[i].permissions.push(
                                selectedPermission )
                        }
                    }

                    var role = {};

                    role.modules=body.selectedFields;
                    role.permissions=modules;
                    role.permissions_array=body.modules;
                    role.title=body.title;
                    role.user_id=req.user._id;
                    role.pipelinePermissions= body.pipelinePermissions;
                    role.dashboardPermissions= body.dashboardPermissions;

                    Roles.create(role, function (err,stage) {
                        if(!err){
                            res.send({status:true,msg:'role saved successfully.',stage:stage});
                        }
                        else{
                            res.send({status:false,msg:'role not saved.'});
                        }
                    })
    //            }
    //        });
    //    }
    //});
});

router.put('/:roleId', function (req, res) {
    var body = req.body;
    var modules=[];

    for(var i=0;i<body.modules.length;i++){
        modules.push({
            name:'',
            permissions:[]
        });

        modules[i].name=body.modules[i].name;

        for(var j=0;j<body.modules[i].selectedPermissions.length;j++) {
            var selectedPermission = body.modules[i].selectedPermissions[j].label.toLowerCase();
            modules[i].permissions.push(
                selectedPermission )
        }
    }
    var role={};
    role.modules=body.selectedFields;

    role.permissions=modules;
    role.permissions_array=body.modules;
    role.title=body.title;
    role.pipelinePermissions= body.pipelinePermissions;
    role.dashboardPermissions= body.dashboardPermissions;
    role.user_id=req.user._id;

    Roles.update({_id:req.body.id},role, function (err, role) {

        if(!err) {
            res.send({status: true, msg: 'Role updated successfully.', data: role});
        }
        else {
            res.send({status: false, msg: 'Role not updated.'});
        }
    });
});

router.post('/getExistingRoles', function (req, res) {
    Roles.find({}, function (err,docs) {
        if(!err) {
            res.send({status: true, msg: 'Role names', data: docs});
        }
        else{
            res.send({status:false,msg:'Role name not available', data:[]});
        }
    });
});

module.exports = router;
