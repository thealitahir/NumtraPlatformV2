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

router.get('/', function (req, res) {
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

router.get('/bulkInsert/insert', function (req, res) {

    components = {
        "iot": [
            {"icon":"mqtt","name": "MQTT", "type": "mqtt_hub"},
            {"icon":"coap","name": "CoAP", "type": "coap_hub"},
            {"icon":"amqp","name": "AMQP","type": "amqp_hub"},
            {"icon":"stomp","name": "STOMP", "type": "stomp_hub"},
            {"icon":"mqtt","name": "MQTT", "type": "mqtt"},
            {"icon":"amqp","name": "AMQP", "type": "amqp"},
            {"icon":"coap","name": "CoAP", "type": "coap"},
            {"icon":"dds","name": "DDS", "type": "dds"},
            {"icon":"xmpp","name": "XMPP", "type": "xmpp"},
            {"icon":"azure","name": "Azure", "type": "azure"},
            {"icon":"amazonS3","name": "AWS", "type": "aws"},
            {"icon":"amazonS3","name": "ActiveMQ", "type": "activeMQ"},
            {"icon":"stomp","name": "STOMP", "type": "stomp"},
            {"icon":"ibm","name": "IBM", "type": "ibm"}
        ],
        "source": [
            {"icon":"aerospike","name": "Aerospike", "type": "aerospike"},
            {"icon":"hdfs","name": "HDFS", "type": "hdfs"},
            {"icon":"gis-map","name": "GIS Map", "type": "map"},
            {"icon":"amazonS3","name": "S3", "type": "s3"},
            {"icon":"amazonS3","name": "Amazonsqs", "type": "amazonsqs"},
            {"icon":"cassandra","name": "Cassadra", "type": "cassandra"},
            {"icon":"dummy","name": "Dummy Data","type": "dummy"},
            {"icon":"file","name": "File", "type": "file"},
            {"icon":"ftp","name": "Ftp", "type": "ftp"},
            {"icon":"hana","name": "Hana", "type": "hana"},
            {"icon":"hbase","name": "Hbase", "type": "hbase"},
            {"icon":"hive","name": "Hive", "type": "hive"},
            {"icon":"kafka","name": "Kafka", "type": "kafka"},
            {"icon":"kinesis","name": "Kinesis", "type": "kinesis"},
            {"icon":"staging","name": "Data Lake", "type": "datalake"},
            {"icon":"twitter","name": "Twitter", "type": "twitter"},
            {"icon":"redshift","name": "Redshift", "type": "redshift"},
            {"icon":"flume","name": "Flume", "type": "flume"},
            {"icon":"mongo-db","name": "RDBMS", "type": "sqlServer"},
            {"icon":"userData","name": "User Data", "type": "userData"},
            {"icon":"preDefined","name": "Pre Defined", "type": "preDefined"},
            {"icon":"rssfeeds","name": "Rss Feeds", "type": "rssfeeds"},
            {"icon":"staging","name": "Streaming Lake", "type": "streaminglake"},
            {"icon":"staging","name": "K-MEANS Streaming", "type": "kmeansstreaming"},
            {"icon":"staging","name": "Kraken", "type": "kraken"}
        ],
        "transformation": [
            {"icon":"encryption","name": "Encryption", "type": "encryption"},
            {"icon":"top","name": "Top", "type": "max"},
            {"icon":"bottom","name": "Bottom", "type": "min"},
            {"icon":"aggregation","name": "Aggregation", "type": "aggregation"},
            {"icon":"timezone","name": "Date Time", "type": "dateTime"},
            {"icon":"filling","name": "Filling", "type": "filling"},
            {"icon":"filter","name": "Filter", "type": "filter"},
            {"icon":"formula","name": "Formula", "type": "formula"},
            {"icon":"findreplace","name": "Find & Replace", "type": "find_replace"},
            {"icon":"join-1","name": "Block Join", "type": "block_join"},
            {"icon":"merge","name": "Merge", "type": "merge"},
            {"icon":"split","name": "Split", "type": "split"},
            {"icon":"tag","name": "Tag", "type": "tag"},
            {"icon":"text2Vec","name": "text2Vec", "type": "text2Vec"},
            {"icon":"union","name": "Union", "type": "union"},
            {"icon":"optimized-join","name": "Optimized Join","type": "optimizedjoin"},
            {"icon":"findreplace","name":"Rename","type":'rename'},
            {"icon":"filling","name":"Sort","type":'sort'}
        ],
        "datapreprocessing":[
            {"icon":"findreplace","name":"Wrangler","type":'datawrangler'}
        ],
        "sink": [
            {"icon":"aerospike","name": "Aerospike", "type": "aerospike"},
            {"icon":"cassandra","name": "Cassandra", "type": "cassandra"},
            {"icon":"staging","name": "Datalake", "type": "datalake"},
            {"icon":"gis-map","name": "GIS", "type": "gis"},
            {"icon":"hana","name": "Hana", "type": "hana"},
            {"icon":"hbase","name": "HBASE", "type": "hbase"},
            {"icon":"hdfs","name": "HDFS", "type": "hdfs"},
            {"icon":"kafka","name": "Kafka", "type": "kafka"},
            {"icon":"kinesis","name": "Kinesis", "type": "kinesis"},
            {"icon":"redshift","name": "Redshift", "type": "redshift"},
            {"icon":"amazonS3","name": "S3", "type": "s3"},
            {"icon":"amazonS3","name": "Amazonsqs", "type": "amazonsqs"},
            {"icon":"sensor","name": "Sensor Network", "type": "sensor"},
            {"icon":"smart","name": "Smart", "type": "smart"},
            {"icon":"mongo-db","name": "RDBMS", "type": "sqlServer"},
            {"icon":"staging","name": "Streaming Lake", "type": "streaminglake"}
        ],
        "extension": [
            {"icon":"interceptor","name": "Interceptor", "type": "interceptor"},
            {"icon":"custom-operation","name": "Custom Operation", "type": "custom_operation"},
            {"icon":"custom-query","name": "Custom Query", "type": "custom_query"}
        ],
        "analytics": [
            {
                "type": 'training_alternatingleastsquares',
                "icon": "recommender",
                "name": "Alternating Least Squares"
            },
            {
                "type": 'training_decisiontree',
                "icon": "decision-tree",
                "name": "Decision Tree"
            },
            {
                "type": 'training_gaussianmixture',
                "icon": "cluster",
                "name": "Gaussian Mixture"
            },
            {
                "type": 'training_gradientboostedtrees',
                "icon": "gbd",
                "name": "GBT"
            },
            {
                "type": 'training_kmeansmllib',
                "icon": "k-mean",
                "name": "K-Means (MLlib)"
            },
            {
                "type": 'training_logisticregressionsgd',
                "icon": "logistic-regression",
                "name": "Logistic Regression"
            },
            {
                "type": 'training_linearregressionsgd',
                "icon": "linear-regression",
                "name": "Linear Regression"
            },
            {
                "type": 'training_lassoregressionsgd',
                "icon": "lasso",
                "name": "Lasso Regression"
            },
            {
                "type": 'training_ridgeregressionsgd',
                "icon": "ridge",
                "name": "Ridge Regression"
            },
            {
                "type": 'training_svmsgd',
                "icon": "svm",
                "name": "SVM"
            },
            {
                "type": 'training_naivebayes',
                "icon": "naive-bayes",
                "name": "Naive Bayes"
            },
            {
                "type": 'training_ngram',
                "icon": "classifier",
                "name": "Ngram"
            },
            {
                "type": 'training_randomforest',
                "icon": "randomforest",
                "name": "Random Forest"
            },
            {
                "type": 'model_predictor',
                "icon": "predictor",
                "name": "Predictor"
            },
            {
                "type": 'external_predictor',
                "icon": "external-predictor",
                "name": "External Predictor"
            },
            {
                "type": 'sentiment_predictor',
                "icon": "sentiment-predictor",
                "name": "Sentiment Predictor"
            },
            {
                "type": 'ner',
                "icon": "ner",
                "name": "NER"
            },
            {
                "type": 'internal_predictor',
                "icon": "ner",
                "name": "Internal Predictor"
            },
            {
                "type": 'training_ensembler',
                "icon": "ner",
                "name": "Ensembler"
            },
            {
                "type": 'predicting_ensembler',
                "icon": "model",
                "name": "Ensembler Predictor"
            },
            {
                "type": 'training_ldamodel',
                "icon": "lda",
                "name": "LDA"
            },
            {
                "type": 'predicting_alternatingleastsquares',
                "icon": "recommender",
                "name": "Alternating Least Squares"
            },
            {
                "type": 'monte_carlo_predictor',
                "icon": "recommender",
                "name": "Monte Carlo Predictor"
            }
        ]
    };


    for (var key in components) {
        sections = {
            iot: "5a98f1367334e13120b0ccb6",
            source: "5a98f1737334e13120b0ccbb",
            transformation: "5a98f1587334e13120b0ccb8",
            sink: "5a8e715222a8792610ae8c19",
            analytics: "5a8e720822a8792610ae8c1a",
            extension: "5a9e67d095928939009e1b02",
            datapreprocessing:"5a9e95e2bbe90043c4f67034"
        };
        // check if the property/key is defined in the object itself, not in parent
        //key = "analytics";
        if (components.hasOwnProperty(key)) {
            for (i = 0; i < components[key].length; i++) {
                obj = {
                    title: components[key][i].name,
                    subType: components[key][i].type,
                    icon: components[key][i].icon,
                    stageType: key
                };
                component = getDefaultStageVersion(obj);
                component.section_id = sections[key];
                //component.icon = components[key][i].icon;
                Component.create(component, function (err, stage) {

                });
            }
        }
    }
    res.send({msg: "inserted"})
});

function getDefaultStageVersion(component){
    var stageDetail = component;
    var stage = component;
    if(stageDetail.stageType =='iot'){

        if(stageDetail.subType == "amqp"){
            stage.icon='glyphicon-custom glyphicon-iot icon-amqp-iot';
            stage.stage_attributes = {profile:'',notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],/* input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], /*topic:'',*/batch_interval:0,window_interval:0,window_sliding:0,host:'',port:'',username:'',password:'',exchange_name:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "coap"){
            stage.icon='glyphicon-custom glyphicon-iot icon-coap-iot';
            stage.stage_attributes = {profile:'',notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],resource:'',batch_interval:0,window_interval:0,window_sliding:0,host:'',port:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "dds"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-dds-iot';
            stage.stage_attributes = {profile:'',notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],resource:'',batch_interval:0,window_interval:0,window_sliding:0,host:'',port:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
        }
        else if(stageDetail.subType == "mqtt"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-mqtt-iot';
            stage.stage_attributes = {notifiers: [],skipHeader: false,selected_skipHeader_option :  'upload',schemaFile: {name: '', path: '', extension: '',splitter: ''},fields : [{name:'', type:'string'}],input_type:'custom_write',schema_values:'',topic:'',batch_interval:0, window_interval:0,window_sliding:0,host:'',port:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', profile:"",splitter:'',user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }

        else if(stageDetail.subType == "xmpp"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-xmpp-iot';
            stage.stage_attributes = {notifiers: [],skipHeader: false,selected_skipHeader_option :  'upload',schemaFile: {name: '', path: '', extension: '',splitter: ''},fields : [{name:'', type:'string'}],input_type:'custom_write',schema_values:'',topic:'',batch_interval:0, window_interval:0,window_sliding:0,host:'',port:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', profile:"",splitter:'',user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
        }
        else if(stageDetail.subType == "azure"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-xmpp-iot';
            stage.stage_attributes = {notifiers: [],profile:'',skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: 44},fields : [{name:'', type:'string'}],batch_interval:0,window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:44, user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "aws"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-aws-iot';
            stage.stage_attributes = {profile:'',notifiers: [],batch_interval:0, window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes',certificates: [{type: 'Root CA', file:{}},{type: 'Client CA', file:{}},{type: 'Private Key', file:{}}],topic:'',skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}], splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false, selected_schema: []};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "ibm"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-ibm-iot';
            stage.stage_attributes = {profile:'',notifiers: [], application_id: '', batch_interval:0, window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes',skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}], splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false, selected_schema: []};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "activeMQ"){
            stage.icon='glyphicon-custom glyphicon-iot icon-aws-iot';
            stage.stage_attributes = {profile:'',notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],batch_interval:0,window_interval:0,window_sliding:0,host:'',port:'',queue:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "stomp"){
            stage.icon='glyphicon-custom glyphicon-iot icon-stomp-iot';
            stage.stage_attributes = {profile:'',notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],batch_interval:0,window_interval:0,window_sliding:0,queue:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }

        /********* iot HUB stages *********/

        else if(stageDetail.subType == "mqtt_hub"){
            stage.icon = 'glyphicon-custom glyphicon-iot icon-mqtt-iot';
            stage.stage_attributes = {notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ''},fields : [{name:'', type:'string'}],input_type:'custom_write',schema_values:'',batch_interval:0, window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', profile:"",splitter:'',user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }

        else if(stageDetail.subType == "coap_hub"){
            stage.icon='glyphicon-custom glyphicon-iot icon-coap-iot';
            stage.stage_attributes = {notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],batch_interval:0,window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }

        if(stageDetail.subType == "amqp_hub"){
            stage.icon='glyphicon-custom glyphicon-iot icon-amqp-iot';
            stage.stage_attributes = {notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],batch_interval:0,window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }

        else if(stageDetail.subType == "stomp_hub"){
            stage.icon='glyphicon-custom glyphicon-iot icon-stomp-iot';
            stage.stage_attributes = {notifiers: [],skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ""},fields : [{name:'', type:'string'}],batch_interval:0,window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }
    }
    if(stageDetail.stageType =='source'){

        if(stageDetail.subType == "preDefined"){
            stage.icon='glyphicon-custom glyphicon-source icon-kinesis-source';
            stage.stage_attributes = {predefined_stageId : '',actual_sub_type : '',user_comment : ''};
        }
        else if(stageDetail.subType == "aerospike"){
            stage.icon='glyphicon-custom glyphicon-source icon-aerospike-source';
            stage.stage_attributes = {profile:"", namespace : '', set : '',no_of_keys: 1, key_order : 'integer', key_schema : 'c1', defaultSets : [], defaultNamespace : [], user_comment : ''};
        }
        else if(stageDetail.subType == 'file') {
            stage.icon='glyphicon-custom glyphicon-source icon-file-source';
            stage.stage_attributes = {splitter: '', skipHeader: true, selected_skipHeader_option :  'useHeaderLine' , files: [], schemaFile: {name: '', path: '', extension: '', splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], host: '', port:'', is_streaming: false, incrementalLoad: false, user_comment:'',file_type:'dsf'};
        }
        else if(stageDetail.subType == "hdfs"){
            stage.icon='glyphicon-custom glyphicon-source icon-hdfs-source';
            stage.stage_attributes = {splitter : 997,skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '',splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], host:'', port:'',files:[],profile:"", is_streaming: false, incrementalLoad: false, user_comment:'',file_type:'dsf'};
        }
        else if(stageDetail.subType == "api"){
            stage.icon='glyphicon-custom glyphicon-source icon-api-source';
            stage.stage_attributes = {splitter : '',skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '',splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], host:'', port:'',files:[],profile:"", is_streaming: false, incrementalLoad: false, user_comment:''};
        }
        else if(stageDetail.subType == "s3"){
            stage.icon='glyphicon-custom glyphicon-source icon-amazonS3-source';
            stage.stage_attributes = {splitter : 997,skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '',splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], accessKey: '', secretKey: '', bucket: '',files:[],profile:"", is_streaming: false, incrementalLoad: false, user_comment:'',file_type:'dsf'};
        }
        else if(stageDetail.subType=='hbase'){
            stage.icon='glyphicon-custom glyphicon-source icon-hbase-source';
            stage.stage_attributes = {mode:'development',rowKey : [],types : [], columnFamily: '', sinks : [{process_id : '',sink_id : ''}], tableName: '', is_streaming: false, incrementalLoad: false, user_comment:''};
        }
        else if(stageDetail.subType=='sql'){
            stage.icon='glyphicon-custom glyphicon-source icon-sql-source';
            stage.stage_attributes = {host:'',port:'',user :'' ,password:'',database:'',table:'',defaultDatabases:[],defaultTables:[],incrementalLoad: false, checkColumn: '',partitionColumn: '',defaultPartitionColumn:[],profile:"", is_streaming: false, user_comment:''};
        }
        else if(stageDetail.subType=='sqlServer'){
            stage.icon='glyphicon-custom glyphicon-source icon-sql-server-source';
            stage.stage_attributes = {host:'',port:'',user :'' ,password:'',database:'',table:'',defaultDatabases:[],defaultTables:[],incrementalLoad: false, checkColumn: '',partitionColumn: '',defaultPartitionColumn:[],profile:"", is_streaming: false, user_comment:'',field_name:'', dbType:''};
        }
        else if(stageDetail.subType=='mongodb'){
            stage.stage_attributes = {server:'',port:'',database:'',collection:'',defaultDatabases:[],defaultCollections:[],profile:"", is_streaming: false , user_comment:''};
        }
        else if(stageDetail.subType=='userData'){
            stage.stage_attributes = {server:'',port:'',database:'',collection:'',defaultCollections:[],profile:"", is_streaming: false , user_comment:''};
        }
        else if(stageDetail.subType == 'ftp'){
            stage.icon='glyphicon-custom glyphicon-source icon-ftp-source';
            stage.stage_attributes = {splitter : 997,server_address:'',port:'',user_id:'',password:'',files:[],profile:"", is_streaming: false , user_comment:'',file_type:'dsf', remote_path:'/',directories:[],documents:[]};
        }
        else if(stageDetail.subType == 'kafka'){
            stage.icon='glyphicon-custom glyphicon-source icon-kafka-source';
            stage.stage_attributes = {splitter : 997,skipHeader: false, selected_skipHeader_option :  'upload', schemaFile: {name: '', path: '', extension: '',splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], topic:'',batch_interval:1,window_interval:1,window_sliding:1,ZookeeperIP:'',Zookeeperport:'',ConsumerGroup:'',offset:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes',profile:"", is_streaming: true, user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:'',incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType=='dummy'){
            stage.icon='glyphicon-custom glyphicon-source icon-dummy-data-source';
            stage.stage_attributes = {fields : [], records : '', splitter: 44, skipHeader: true, selected_skipHeader_option :  'useHeaderLine', files: [], schemaFile: {name: '', path: '',extension: '',splitter: ''},host:'', port:'', is_streaming: false, user_comment:''};
        }
        else if(stageDetail.subType=='map'){
            stage.icon='glyphicon-custom glyphicon-source icon-gis-map-source';
            stage.stage_attributes = {shapes:[], files:[], is_streaming: false, schema:[]};
        }
        else if(stageDetail.subType=='twitter'){
            stage.icon='glyphicon-custom glyphicon-source icon-twitter-source';
            stage.is_streaming = true;
            stage.stage_attributes = {status : [], is_streaming: false,batch_interval: '', batch_interval_unit: 'Minutes', window_interval: '', window_interval_unit: 'Minutes', window_sliding: '', window_sliding_unit:'Minutes', consumer_key: '', consumer_secret: '' , access_token:'', access_secret:'', user_comment:'' ,checkpoint_duration_unit:'Minutes',checkpoint_duration:'',incrementalLoad:false, stream :'public', hash_tags:'',language:'english', stage_id:''};
        }
        else if(stageDetail.subType=='kinesis'){
            stage.icon='glyphicon-custom glyphicon-source icon-kinesis-source';
            stage.stage_attributes = {splitter: '', skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '', splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], access_key: '', secret_key: '', stream_name: '', read_options: 'All', batch_interval: '', batch_interval_unit: 'Minutes', window_interval: '', window_interval_unit: 'Minutes', window_sliding: '', window_sliding_unit:'Minutes', profile:"", is_streaming: true, user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:'',incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "datalake"){

            stage.icon='glyphicon-custom glyphicon-source icon-staging-source';
            stage.stage_attributes = {clusterIP:'', clusterGroup:'',profile:'', mode: 'development',sinks : [{process_id : '',sink_id : ''}], /*original_query : '', modified_query : '',*/process : '', is_streaming: false, user_comment:'',incrementalLoad:false};
        }
        else if(stageDetail.subType == "streaminglake"){

            stage.icon='glyphicon-custom glyphicon-source icon-staging-source';
            stage.is_streaming = true;
            stage.stage_attributes = {clusterIP:'', clusterGroup:'',profile:'', mode: 'development',sinks : [{process_id : '',sink_id : ''}], process : '', user_comment:'',incrementalLoad:false};
        }
        else if(stageDetail.subType == "kmeansstreaming"){

            stage.icon='glyphicon-custom glyphicon-source icon-staging-source';
            stage.is_streaming = true;
            stage.stage_attributes = {clusterIP:'', clusterGroup:'',profile:'', mode: 'development',sinks : [{process_id : '',sink_id : ''}], process : '', user_comment:'',incrementalLoad:false, k: 2, decay_factor: 0.5, dimensions: 2, weight: 100.0, time: 0, time_interval_unit: 'Minutes'};
        }
        else if(stageDetail.subType == "kraken"){

            stage.icon='glyphicon-custom glyphicon-source icon-staging-source';
            stage.is_streaming = true;
            stage.stage_attributes = {clusterIP:'', clusterGroup:'',profile:'', mode: 'development',sinks : [{process_id : '',sink_id : ''}], process : '', user_comment:'',incrementalLoad:false, k: 2, decay_factor: 0.5, dimensions: 2, weight: 100.0, time: 0, time_interval_unit: 'Minutes'};
        }
        else if(stageDetail.subType == "url"){
            stage.icon='glyphicon-custom glyphicon-source icon-url-source';
            stage.stage_attributes = {splitter : '',skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '',splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], host:'', port:'',files:[],profile:"", is_streaming: false, incrementalLoad: false, user_comment:''};

        }
        else if(stageDetail.subType == "cassandra"){
            stage.icon='glyphicon-custom glyphicon-source icon-cassandra-source';
            stage.stage_attributes = {host:'', port:'', input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], keyspace:'', defaultKeySpace:[], table_name:'',defaultTableName:[], profile:"", incrementalLoad: false, user_comment:'', field_name:''};
        }
        else if(stageDetail.subType == "hana"){
            stage.icon='glyphicon-custom glyphicon-source icon-hana-source';
            stage.stage_attributes = {host:'', port:'', username:'', password:'', schema_name : '' , table_name: '', default_schema_names :[] , default_table_names:[], profile:"", incrementalLoad: false, user_comment:''};
        }
        else if(stageDetail.subType == "redshift"){
            stage.icon='glyphicon-custom glyphicon-source icon-redshift-source';
            stage.stage_attributes = {endpoint:'', port:'', username:'', password:'', database_name : '' , table_name: '', default_database_names :[] , default_table_names:[], profile:"", incrementalLoad: false, user_comment:''};
        }
        else if(stageDetail.subType == "flume"){
            stage.is_streaming = true;
            stage.icon='glyphicon-custom glyphicon-source icon-flume-source';
            stage.stage_attributes = {stage_id  :'' , pipeline_id : '',  log_path:'', profile:'', file_name:'', file_path:'', user_comment:'',schemaFile: {name: '', path: '', extension: '', splitter: ''},splitter: '',skipHeader: true, selected_skipHeader_option :  'useHeaderLine'};
        }
        else if(stageDetail.subType == "iot"){
            stage.icon='glyphicon-custom glyphicon-source icon-sensor-source';
            stage.stage_attributes = {skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '',splitter: ""}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], /*topic:'',*/batch_interval:'',window_interval:'',window_sliding:'',host:'',port:'',userName:'',password:'',exchangeName:'',batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes',profile:"", is_streaming: true, splitter:"", user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:'',incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType=='hive'){
            stage.icon='glyphicon-custom glyphicon-source icon-hive-source';
            stage.stage_attributes = {host:'',port:'',user :'' ,password:'',database:'',table:'',defaultDatabases:[],defaultTables:[],incrementalLoad: false, checkColumn: '',partitionColumn: '',defaultPartitionColumn:[],profile:"", is_streaming: false, user_comment:''};
        }
        else if(stageDetail.subType=='rssfeeds'){
            stage.icon='glyphicon-custom glyphicon-source icon-kinesis-source';
            stage.stage_attributes = {url:'',splitter: 997, skipHeader: true, selected_skipHeader_option :  'useHeaderLine', schemaFile: {name: '', path: '', extension: '', splitter: ''}, input_type:'custom_write', schema_values:'', fields : [{name:'', type:'string'}], access_key: '', secret_key: '', stream_name: '', read_options: 'All', batch_interval: '', batch_interval_unit: 'Minutes', window_interval: '', window_interval_unit: 'Minutes', window_sliding: '', window_sliding_unit:'Minutes', profile:"", is_streaming: true, user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:'',incrementalLoad:false};
            stage.is_streaming = true;
        }
        else if(stageDetail.subType == "amazonsqs"){
            stage.icon='glyphicon-custom glyphicon-source icon-amazonS3-source'
            stage.stage_attributes = {notifiers: [],skipHeader: false,selected_skipHeader_option :  'upload',schemaFile: {name: '', path: '', extension: '',splitter: ''},fields : [{name:'', type:'string'}],input_type:'custom_write',schema_values:'',region:'',queueName:'',batch_interval:0, window_interval:0,window_sliding:0,batch_interval_unit:'Minutes',window_interval_unit:'Minutes',window_sliding_unit:'Minutes', profile:"",splitter:'',user_comment:'',checkpoint_duration_unit:'Minutes',checkpoint_duration:0,incrementalLoad:false};
            stage.is_streaming = true;
        }
    }
    if(stageDetail.stageType =='sink'){
        if(stageDetail.subType == "aerospike"){
            stage.icon='glyphicon-custom glyphicon-sink icon-aerospike-sink';
            stage.stage_attributes = { profile: "", host : '', port : '', namespace : '', set_option: 'new', set : '', key_schema : '',defaultSets : [], defaultNamespace : [], user_comment : ''};
        }
        if(stageDetail.subType == "hdfs"){
            stage.icon='glyphicon-custom glyphicon-sink icon-hdfs-sink';

            stage.stage_attributes = {append_schema : true ,  splitter : '',merge_output_file : false, output_file_name : '',output_format : 'dsf', host:'', port:'', path:'',profile:"", user_comment:'',compression:'uncompressed'};
        }
        else  if(stageDetail.subType == "s3"){
            stage.icon='glyphicon-custom glyphicon-sink icon-amazonS3-sink';
            stage.stage_attributes = {skipHeader: true,counter:-1,total_files:0, splitter : '',append_schema : true ,merge_output_file : false, output_file_name : '',output_format : 'dsf', accessKey: '', secretKey: '',bucket:'', path:'',profile:"", user_comment:'',compression:'uncompressed'};
        }
        else if (stageDetail.subType == 'hbase') {
            stage.icon='glyphicon-custom glyphicon-sink icon-hbase-sink';
            stage.stage_attributes = {tableName: '',rowKey : [''],types : [''],columnFamily: '',table_format:"new",column_format:"new",user_comment:'', field_name:''};
        }
        else if (stageDetail.subType == 'kafka') {
            stage.icon='glyphicon-custom glyphicon-sink icon-kafka-sink';
            stage.is_streaming = false;
            stage.stage_attributes = {topic : '', brokerList : [], producerType : 'Synchronous',profile : '', user_comment:''};
        }
        else if(stageDetail.subType == "datalake"){
            stage.icon='glyphicon-custom glyphicon-sink icon-staging-sink';
            stage.stage_attributes = {clusterIP:'', clusterGroup:'', profile:'', append_schema : true ,merge_output_file : false, output_file_name : '',output_format : 'parquet', host: '', port:'', path:'/staging',profile:"", user_comment:''};
        }
        else if(stageDetail.subType == "streaminglake"){
            stage.is_streaming = true;
            stage.icon='glyphicon-custom glyphicon-sink icon-staging-sink';
            stage.stage_attributes = {clusterIP:'', clusterGroup:'', profile:'', append_schema : true ,merge_output_file : false, output_file_name : '',output_format : 'parquet', host: '', port:'', path:'/staging',profile:"", user_comment:''};
        }
        else if(stageDetail.subType == "kinesis"){
            stage.icon='glyphicon-custom glyphicon-sink icon-kinesis-sink';
            stage.stage_attributes = { access_key: '', secret_key: '', stream_option: 'new', stream_name: '', profile:"", user_comment:''};
            stage.is_streaming = false;
        }
        else if(stageDetail.subType == "smart"){
            stage.icon='glyphicon-custom glyphicon-sink icon-smart-sink';
            stage.stage_attributes = {clusterIP:'',clusterGroup:'', profile:'', row_key : [''],post_hook : '', user_comment:''};
            //stage.stage_attributes = {row_key : [''],post_hook : '',apply_permission:false,permission_policy:'', user_comment:''};
        }
        else if(stageDetail.subType == "cassandra"){
            stage.icon='glyphicon-custom glyphicon-sink icon-cassandra-sink';
            stage.stage_attributes = {host:'', port:'', keyspace_option:'new', keyspace:'', defaultKeySpace:[], table_option:'new', table_name:'', defaultTableName:[], primary_key_columns:[], profile:"", user_comment:''};
        }
        else if(stageDetail.subType == "hana"){
            stage.icon='glyphicon-custom glyphicon-sink icon-hana-sink';
            stage.stage_attributes = {host:'', port:'', username:'', password:'', schema_option:'new',  table_option:'new' , schema_name : '' , table_name: '',primary_key : [],default_schema_names :[] , default_table_names:[], profile:"", user_comment:''};
        }
        else if(stageDetail.subType == "gis"){
            stage.icon='glyphicon-custom glyphicon-sink icon-gis-map-sink';
            stage.stage_attributes = {saveTiles:false,profile:'', classification:[], aggregateOn:[],geometryFields:[],classificationFields:[],advanced:false, user_comment:''};
        }
        else if(stageDetail.subType == "redshift"){
            stage.icon='glyphicon-custom glyphicon-sink icon-redshift-sink';
            stage.stage_attributes = {endpoint:'', port:'', username:'', password:'', database_option:'new',  table_option:'new' , database_name : '' , table_name: '',primary_key : '',default_database_names :[] , default_table_names:[], profile:"", user_comment:''};
        }
        else if(stageDetail.subType == "sql"){
            stage.icon='glyphicon-custom glyphicon-sink icon-sql-sink';
            stage.stage_attributes = {host:'',port:'',user :'' ,password:'',database:'',table:'',defaultDatabases:[],defaultTables:[], profile:"", database_format : 'new', table_format:"new", user_comment:''};
        }
        else if(stageDetail.subType == "sqlServer"){
            stage.icon='glyphicon-custom glyphicon-sink icon-sql-server-sink';
            stage.stage_attributes = {host:'',port:'',user :'' ,password:'',database:'',table:'',defaultDatabases:[],defaultTables:[], profile:"", database_format : 'new', table_format:"new", user_comment:'', dbType:'', table_operation:''};
        }
        else if(stageDetail.subType == "sensor"){
            stage.icon='glyphicon-custom glyphicon-sink icon-sensor-sink';
            stage.stage_attributes = {topic : '', brokerList : [{ip : '', port : ''}], producerType : 'Synchronous',profile : '', user_comment:''};
        }
        else if(stageDetail.subType == "amazonsqs"){
            stage.icon='glyphicon-custom glyphicon-sink icon-amazonS3-sink';
            stage.stage_attributes = {skipHeader: true,counter:-1,total_files:0, splitter : '',append_schema : true ,merge_output_file : false, output_file_name : '',output_format : 'dsf', accessKey: '', secretKey: '',bucket:'', path:'',profile:"",region:'',queueName:'', user_comment:'',compression:'uncompressed'};
        }
    }
    if(stageDetail.stageType =='transformation'){

        if(stageDetail.subType == "block_join"){
            stage.stage_attributes = {join_type:'inner',keys:[{fieldA:'',fieldB:''}],stageA:'',stageB:'', user_comment:''};
        }
        else if(stageDetail.subType == "skew_join"){
            stage.stage_attributes = {join_type:'inner',keys:{fieldA:'',fieldB:''},stageA:'',stageB:'', user_comment:''};
        }
        else if(stageDetail.subType == "optimizedjoin"){
            stage.stage_attributes = {profile:'',fields:[], namespace:'',set:'',key_schema:'',key_order:'', user_comment:''};
        }
        else if(stageDetail.subType == "union"){
            stage.stage_attributes = {unions:[],selected_unions:[], user_comment:''};
        }
        else if(stageDetail.subType == "encryption"){
            stage.stage_attributes = {input_fields:[], output_fields:[], algorithm:'',save_as_new_field:false, user_comment:''};
        }
        else if(stageDetail.subType == "compression"){
            stage.stage_attributes = {input_fields:[], output_fields:[], algorithm:'',save_as_new_field:false, user_comment:''};
        }
        else if(stageDetail.subType == "min"){
            stage.stage_attributes = {attributes:{field: "",dataType: "",topResults: ""},parameter:false,stage_id:'', user_comment:''};
        }
        else if(stageDetail.subType == "max"){
            stage.stage_attributes = {attributes:{field: "",dataType: "",topResults: ""},parameter:false,stage_id:'', user_comment:''};
        }
        else if(stageDetail.subType == "filter"){
            stage.stage_attributes = {use_expression:true, expression:[{to_compare_field_name: "", to_compare_field_dataType: '', operator: "", with_compare_type: "", with_compare_field_name: "", with_compare_field_dataType: '', activeCustom: 'custom', logical_operator: "",showOptions:true}], use_time_window:false, date_time_field:'',start_time:0, end_time:0, use_regex:false, regex:[], user_comment:''};
        }
        else if(stageDetail.subType == "aggregation") {
            stage.stage_attributes = {aggregate_on: [], group_by: [] , date_time_field:'', use_time_window:false, time_window:'hourly' , custom_value: '', time_window_custom_value:0, time_window_custom_unit:'',time_window_interval_start:0,time_window_interval_end:0, user_comment:''};
        }
        else if(stageDetail.subType == "formula"){
            stage.stage_attributes = {use_expression:true,expression:[],output_fields:[],formula:'', user_comment:''};
        }
        else if(stageDetail.subType == "split"){
            stage.stage_attributes = {input_fields:[], output_fields:[], splitter: [], field_count:'', discard:true , /*parameter:false,*/ user_comment:''};
        }
        else if(stageDetail.subType == "find_replace"){
            stage.stage_attributes = {input_fields:[] , output_fields:[] ,find_option:'custom', find_string:'',replace_option:'custom',  replace_string:'', user_comment:''};
        }
        else if(stageDetail.subType == "merge"){
            stage.stage_attributes = {fields: [],input_fields:[],separator:[],output_fields:[], user_comment:''};
        }
        else if(stageDetail.subType == "tag"){
            stage.stage_attributes = {tags:[], fields : [], user_comment:'' };
        }
        else if(stageDetail.subType == "dateTime"){
            stage.stage_attributes = { input_fields:[], output_fields:[], format:'milliseconds',timeZoneFormat:'stream', fieldType:[], input_format:'', user_comment:''};
        }
        else if(stageDetail.subType == "filling"){
            stage.stage_attributes = {model_row_key:[],row_key_columns:[],fill_wrt_columns:'',lower_range:'',upper_range:'',step:'',filling_columns:[{label:'',field:{},fill_value:'random'}],filling_remaining_col:'random', user_comment:''};
        }
        else if(stageDetail.subType == "text2Vec"){
            stage.stage_attributes = {file_name : '', path : '', file_extension : '', text : {_id : '' , position : ''} , user_comment:'',host : '', port : '',no_of_lines_in_file : '',extraction_method: 'dictionary'};            }
        else if(stageDetail.subType == "rename"){
            stage.stage_attributes = {attributes:[]};
        }
        else if(stageDetail.subType == "sort"){
            stage.stage_attributes = {columnName:'', sortBy:'',user_comment:''};
        }
    }
    if(stageDetail.stageType =='gis_transformation'){
        if(stageDetail.subType == "join"){
            stage.stage_attributes = {
                attributes:[],
                schemaIndex:0,
                schemaIndex2:0
            };
        }
        if(stageDetail.subType == "inrix"){
            stage.stage_attributes = {
                attributes:[]
            };
        }
        else if(stageDetail.subType == "geocoding"){
            stage.stage_attributes = {
                fieldName:'',
                fieldType:'',
                attributes:[],
                user_comment:''
            };
        }
        else if(stageDetail.subType == "reverse_geocoding"){
            stage.stage_attributes = {
                latField:'',
                longField:'',
                attributes:[],
                user_comment:''
            };
        }
        else if(stageDetail.subType == "spatial_join"){
            stage.stage_attributes = {
                attributes:[],
                schemaIndex:0,
                schemaIndex2:0
            };
        }
        else if(stageDetail.subType == "buffer"){
            stage.stage_attributes = {
                distance:0.0,
                field:'',
                source:'',
                srcName:'',
                selectedFields:[],
                newFieldName:''
            };

        }
        else  if(stageDetail.subType == "filter"){
            stage.stage_attributes = {
                attributes:[]
            };
        }
        else  if(stageDetail.subType == "contains_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"contains"
            };
        }
        else  if(stageDetail.subType == "crosses_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"crosses"
            };
        }
        else  if(stageDetail.subType == "within_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"within"
            };
        }
        else  if(stageDetail.subType == "disjoint_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"disjoint"
            };
        }
        else  if(stageDetail.subType == "intersects_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"intersects"
            };
        }
        else  if(stageDetail.subType == "equals_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"equals"
            };
        }
        else  if(stageDetail.subType == "overlaps_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"overlaps"
            };
        }
        else  if(stageDetail.subType == "touches_filter"){
            stage.stage_attributes = {
                attributes:[],operator:"touches"
            };
        }

        else  if(stageDetail.subType == "custom_filter"){
            stage.stage_attributes = {
                attributes:[]
            };
        }
        else  if(stageDetail.subType == "geometry_conversion"){
            stage.stage_attributes = {
                col1Name:'',
                col2Name:'',
                newColName:'',
                conversionType:''
            };
        }
        else if(stageDetail.subType == "filter_waypoints"){
            stage.stage_attributes = {
                waypoint_field:''
            };
        }
        else if(stageDetail.subType == "transformation_flatten"){
            stage.stage_attributes = {
                nested_field:'',
                nested_field_schema:'',
                nested_attributes:[],
                add_new_column:false,
                new_column:{alias:'',field:'',type:'',checked:true},
                show_nested_attributes:false
            };
        }
        else if(stageDetail.subType == "filter_inrix"){
            stage.stage_attributes = {
                nested_field:'',
                nested_field_schema:'',
                nested_attributes:[],
                group_by_fields:[],
                filter_operator:'',
                geometry_field:'',
                show_nested_attributes:false
            };
        }
        else if(stageDetail.subType == "area_transformation"){
            stage.stage_attributes = {
                attributes:[],
                schemaIndex:''
            };
        }
        else if(stageDetail.subType == "length_transformation"){
            stage.stage_attributes = {
                attributes:[],
                schemaIndex:''
            };

        }
        else if(stageDetail.subType == "distance_transformation"){
            stage.stage_attributes = {
                attributes:[]
            };

        }
        else if(stageDetail.subType == "geo_conversion"){
            stage.stage_attributes = {
                attributes: []
            };
        }
        else if(stageDetail.subType == "union"){
            stage.stage_attributes = {
                field1Name:"", field2Name:"",
                newFieldName:""
            };
        }
        else if(stageDetail.subType == "intersection"){
            stage.stage_attributes = {
                field1Name:"", field2Name:"",
                newFieldName:""
            };
        }
        else if(stageDetail.subType == "difference"){
            stage.stage_attributes = {
                field1Name:"", field2Name:"",
                newFieldName:""
            };
        }
        else if(stageDetail.subType == "symmetric_difference"){
            stage.stage_attributes = {
                field1Name:"", field2Name:"",
                newFieldName:""
            };
        }
        else if(stageDetail.subType == "aggregation"){
            stage.stage_attributes = {
                aggregateOn:"",
                operator:"",
                newFieldName:"",
                groupBy:[],
                groupByModel:[]
            };
        }
    }
    if(stageDetail.stageType =='analytics'){

        if(stageDetail.subType == "training_alternatingleastsquares"){
            stage.stage_attributes = {validation:false
                ,user:'', product:'',ratings:'',lambda:'0.01',rank:'10',implicit_preference:false,retrainType:'once', user_comment:'',iterations:1,data_cleansing:[],transformations:[],features:[],text_analytics:[]};
        }

        else if(stageDetail.subType == "predicting_alternatingleastsquares"){
            stage.stage_attributes = {recommendTo:'User',recommenderInputFieldValue:'' , user_comment:'',recommendation_count:5,user:'', product:'',ratings:''};
        }

        else if(stageDetail.subType == "training_logisticregressionsgd"){
            stage.stage_attributes = {features:[],label:'',probability:false,validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',updater:'',mini_batch_fraction:'1.0',no_of_iterations:'100',regularization_parameter:'0.01',step_size:'1.0',intercept:false,validate:false,retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_logisticregressionsgd"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_svmsgd"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',updater:'',mini_batch_fraction:'1.0',no_of_iterations:'100',regularization_parameter:'0.01',step_size:'1.0',intercept:false,validate:false,retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_svmsgd"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_linearregressionsgd"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',updater:'',mini_batch_fraction:'1.0',no_of_iterations:'100',regularization_parameter:'0.01',step_size:'1.0',intercept:false,validate:false,retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_linearregressionsgd"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_lassoregressionsgd"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',updater:'',mini_batch_fraction:'1.0',no_of_iterations:'100',regularization_parameter:'0.01',step_size:'1.0',intercept:false,validate:false,retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_lassoregressionsgd"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_ridgeregressionsgd"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',updater:'',mini_batch_fraction:'1.0',no_of_iterations:'100',regularization_parameter:'0.01',step_size:'1.0',intercept:false,validate:false,retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_ridgeregressionsgd"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_kmeansmllib"){
            stage.stage_attributes = {save_OandT:false,features:[],K:'1',validation:true,initialization_mode:'',maximum_iterations:'20',initialization_steps:'5',epsilon:'1e-4',runs:'1',retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_kmeansmllib"){
            stage.stage_attributes = { user_comment:''};
        }

        else if(stageDetail.subType == "training_gaussianmixture"){
            stage.stage_attributes = {save_OandT:false,features:[],K:'1',validation:true,maximum_iterations:'100',convergence:'0.01', retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_gaussianmixture"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_decisiontree"){
            stage.stage_attributes = {features:[],label:'',validation:false,parameter_sweeping:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',type:'',impurity:'',maximum_depth:'5',maximum_bins:'32',retrainType:'once',retrainOptions:'full',showOptions:false, user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[],
                model_conf:{ bin_type:'custom',depth_type:'custom',impurity:[], maximum_depth:[], maximum_bins:[]}
            };
        }

        else if(stageDetail.subType == "predicting_decisiontree"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_randomforest"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',k_fold:'',type:'',impurity:'',feature_subset_strategy:'',maximum_depth:'5',maximum_bins:'32',no_of_trees:'20',retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_randomforest"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_gradientboostedtrees"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                validation_percentage:'',type:'',loss_function:'',learning_rate:'0.1',maximum_depth:'5',maximum_bins:'32',no_of_iterations:'100',retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_gradientboostedtrees"){
            stage.stage_attributes = {user_comment:''};
        }

        else if(stageDetail.subType == "training_naivebayes"){
            stage.stage_attributes = {features:[],label:'',validation:false,validation_type:'', k_fold:'',save_OandT:false,feature_selector:false,selector:'',no_of_selector_features:'',
                validation_percentage:'',lambda:'1.0',retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_naivebayes"){
            stage.stage_attributes = {user_comment:''};
        }
        else if(stageDetail.subType == "training_kmeansh2o"){
            stage.stage_attributes = {features:[],label:'',save_OandT:false,feature_selector:false,feature_extractor:false,selector:'',extractor:'',no_of_selector_features:'',no_of_extractor_features:'',
                K:'1',ignore_constant_columns:false,maximum_iterations:'1000',initialization_mode:'',score_each_iteration:false,standardize_features:false,seed:'123456789',retrainType:'once', user_comment:'',
                transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }

        else if(stageDetail.subType == "predicting_kmeansh2o"){
            stage.stage_attributes = { user_comment:''};
        }

        else if(stageDetail.subType == "training_ngram"){
            stage.stage_attributes = {retrainType:'once', features:[],label:'',validation:false, validation_percentage:'',validation_type:'percentage', k_fold:'',language:'',stop_words_option:'default',file_name:'',file_attributes:{extension:'',path:'',host:'',port:''}, user_comment:''};
        }

        else if(stageDetail.subType == "predicting_ngram"){
            stage.stage_attributes = {feature:'', user_comment:''};
        }

        else if(stageDetail.subType == "model_predictor"){
            stage.stage_attributes = {profile:"",files:[],model_location:'',accessKey:'',secretKey:'',bucket:'',host:'',port:'',model_path:'',algorithm:'',model_fields:[],model_format:'pmml', user_comment:''};
        }
        else if(stageDetail.subType == "external_predictor"){
            stage.stage_attributes = {profile:"",files:[],model_location:'',accessKey:'',secretKey:'',bucket:'',host:'',port:'',model_path:'',model_fields:[], user_comment:''};
        }

        else if(stageDetail.subType == "sentiment_predictor"){
            stage.stage_attributes = {text : {_id : '' , position : ''}, user_comment:''};
        }

        else if(stageDetail.subType == "ner"){
            stage.stage_attributes = {text_feature:'', user_comment:''};
        }
        else if(stageDetail.subType == "internal_predictor"){
            stage.stage_attributes = {model_process:'different', model_process_id:'', model_stage_id:''};
        }
        else if(stageDetail.subType == "training_ldamodel"){
            stage.stage_attributes = {
                retrainType:'once',features:[],max_iterations:'',doc_concentration:'',topic_concentration:'',no_of_topics:'',optimizer:'EM',
                output:'',output_value:{},validation:true, transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }
        else if(stageDetail.subType == "training_ensembler"){
            stage.stage_attributes = {
                retrain_type:'once',features:[],label:'',feature_selector:false,selector:'',no_of_selector_features:'',validation:false,validation_type:'', k_fold:'',save_OandT:false, validation_percentage:'',type:'',
                ensembling_type:'',blender:{type:'',configurations:{}}, learners:[], transformations:[], label_transformation:{transformation:''},data_cleansing:[],text_analytics:[]
            };
        }
        else if(stageDetail.subType == "predicting_ensembler"){
            stage.stage_attributes = {user_comment:''};
        }
        else if(stageDetail.subType == "monte_carlo_predictor"){
            stage.stage_attributes = {user_comment:''};
        }
        if(stageDetail.subType == "frequent_pattern_mining") {
            stage.stage_attributes = { minimum_support:'',minimum_confidence:'',frequent_pattern:'itemsets' }
        }
    }
    if(stageDetail.stageType =='datapreprocessing'){
        if(stageDetail.subType == "datawrangler"){
            stage.stage_attributes = {data_cleansing:[],transformations:[],user_comment:''};
        }
    }
    if(stageDetail.stageType=='extension'){
        if(stageDetail.subType == "interceptor"){
            stage.stage_attributes = {
                class_name:"",className:"MyInterceptor", jar_file_path:"",
                stages_in:[],
                //code:"import org.apache.spark.sql.DataFrame\r\nimport org.apache.spark.sql.types.StructType\r\nimport org.apache.spark.sql.SQLContext\r\nimport org.apache.spark.SparkContext\r\n\r\n// your imports here, (only spark and scala classes)\r\n\r\nclass MyInterceptor {\r\n  def run(inputData: Map[Int, DataFrame],\r\n      sparkContext: SparkContext,\r\n          sqlContext: SQLContext): DataFrame = {\r\n    \r\n    // Get schema of first input stage, [0, stages-1]\r\n    val schema: StructType = inputData(0).schema \r\n    \r\n    // Create an empty DataFrame\r\n    val resultantDataFrame: DataFrame = sqlContext.emptyDataFrame\r\n    \r\n    // your code here .. \r\n    \r\n    // Return the final DataFrame containing data\r\n    resultantDataFrame\r\n  }\r\n}",
                code:"import org.apache.spark.sql.DataFrame\nimport org.apache.spark.sql.types.StructType\nimport org.apache.spark.sql.SQLContext\nimport org.apache.spark.SparkContext\n\nimport scala.collection.mutable.{ Map => MutMap }\n\n// your imports here, (only spark and scala classes)\nclass MyInterceptor {\n\tdef run(inputData: Map[Int, DataFrame],\n\tsparkContext: SparkContext,\n\tsqlContext: SQLContext,\n\tparams: MutMap[String, (String, String)]): DataFrame = {\n\n// Get schema of first input stage, [0, stages-1]\nval schema: StructType = inputData(0).schema\n\n// Create an empty DataFrame\nval resultantDataFrame: DataFrame = sqlContext.emptyDataFrame\n\n// your code here ..\n\n// Return the final DataFrame containing data\n\nresultantDataFrame\n}\n}",
                schema:[]
            };
        }
        else if(stageDetail.subType == "custom_operation"){
            stage.stage_attributes = {
                class_name:"",className:"com.platalytics.platform.custom.s", jar_file_path:"",
                stages_in:[],
                schema:[],
                file:{}
            };
        }
        else if(stageDetail.subType == "custom_query"){
            stage.stage_attributes = {
                query:"",
                raw_query:"",
                stages_in:[],
                schema:[],
                file:{}
            };
        }
    }
    return stage;
}

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
}


module.exports = router;
