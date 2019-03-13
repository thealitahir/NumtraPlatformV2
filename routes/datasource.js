var express = require('express');
const path = require('path');
var router = express.Router();
var request = require("request");
var multer = require('multer');
const csv = require('csv-parser');
var fs = require('fs');
var app = express();

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        console.log(file);
        cb(null,Date.now()+'.'+file.originalname);
    }
});
var upload = multer({storage:store}).single('file');

router.get('/logout',function (req, res) {

    req.session.destroy();
    req.logout();
    res.send();
});

router.get('/getDataSource/:id', function(req,res) {
    console.log('node routes');
    console.log(req.params);
        // var url='http://192.168.23.180:7799/api/v1/getDataSource/' + req.params.id;
        var url= CONFIGURATIONS.requestApi +'/api/v1/getDataSource/' + req.params.id;
       // var data;
         request({
         url: url,
         method: 'GET',
         headers: {
         'Content-Type': 'application/json'
         }
         }, function(error, response, body) {
            // console.log(body);
             res.send(body);

         });
});

router.get('/getAllDataSources', function(req,res) {
    // var url='http://192.168.23.180:7799/api/v1/getDataSources/1234';
    var url= CONFIGURATIONS.requestApi +'/api/v1/getDataSources/1234';
    console.log('get all data sources');
    console.log(url);
    var data;
     request({
     url: url,
     method: 'GET',
     headers: {
     'Content-Type': 'application/json'
     }
     }, function(error, response, body) {
          console.log('get all data sources');
          console.log(body);
         res.send(body);

     });
});

router.post('/createDataSource',function(req,res,next){
    if(req.body.relations .length > 0){
        var relstatus =1
    }
    else{
        var relstatus= 0
    }
             var data={name: req.body.name, description:req.body.description,data_type:req.body.datatype,fileSource:req.body.fileSource,problemName:req.body.problemName,problemParam:req.body.problemParam,
                problemStatus:req.body.problemStatus,location_data:req.body.path,relations:req.body.relations,category:'csv',source:'',facets:{},features:{},rel_status:relstatus,ml_status:0,dataSrc_status:0 }
                 ;
                 console.log(data);
                //  if(data.relations.length > 0){
                //      var uri = CONFIGURATIONS.requestApi +'/api/v1/datasource/FeatureTools/create';
                //  } else {
                //     var uri = CONFIGURATIONS.requestApi +'/api/v1/datasource/create';
                //  }
                var uri =CONFIGURATIONS.requestApi +'/api/v1/datasource/createALL';
                 console.log(uri);
        request({
            // url: 'http://192.168.23.180:7799/api/v1/datasource/create',
            url: uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: data
        }, function(error, response, body) {
           
            res.send(body);


        });
   
});


router.post('/addDataSourceFeatures',function(req,res,next){
    var data=req.body;
    console.log(data); 
    request({
    // url: 'http://192.168.23.180:7799/api/v1/transformedFeatures',
    url: CONFIGURATIONS.requestApi +'/api/v1/transformedFeatures',
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

router.post('/addTransFeatures',function(req,res){
    var data=req.body;
    console.log('add trans features');
    console.log(data); 
    request({
    // url: 'http://192.168.23.180:7799/api/v1/transformedFeaturesSelected',
    url: CONFIGURATIONS.requestApi +'/api/v1/transformedFeaturesSelected',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: data
    }, function(error, response, body) {
    console.log('add trans data response');
    console.log(body);
    res.send(body);


    });
});

router.post('/relationFeatures',function(req,res){
    var data=req.body;
    console.log('relation features');
    console.log(data); 
    request({
    url:CONFIGURATIONS.requestApi + '/api/v1/relFeaturesSelected',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: data
    }, function(error, response, body) {
        console.log('relation data response');
        console.log(body);
        res.send(body);
    });
});

router.get('/getTransformedData/:id',function(req,res,next){
    // var url='http://192.168.23.180:7799/api/v1/updatedTransformations'+ req.params.id;
    var url= CONFIGURATIONS.requestApi +'/api/v1/updatedTransformations'+ req.params.id;
    var data;
     request({
     url: url,
     method: 'GET',
     headers: {
     'Content-Type': 'application/json'
     }
     }, function(error, response, body) {
         res.send(body);

     });
});
router.post('/dataSources',function(req,res){   
    console.log('getDataSrcs');
    console.log(req.body);
    io.emit('onGetDataSrcs', req.body);
    res.send('OK');
});

router.post('/gettransnotifiy',function(req,res){
   var data;
   console.log('transnotiffy');
    console.log(req.body);
    io.emit('ontransnotify', req.body);
    res.send('OK');
});

router.post('/getmodelnotify',function(req,res){
    console.log('modelnotify');
    console.log(req.body);
    io.emit('onmodelnotify',req.body);
    res.send('ok');
});

router.post('/loadDataSrcLabel',function(req,res){
    //ssn = req.session;
    console.log('loadDataSrcLabel');
    console.log(req.body);

    var results = [];
     var labels = {};
     
     setTimeout(function() {
     fs.createReadStream('./relationFiles/'+req.body.labelFilePath)
    // fs.createReadStream('./relationFiles/churnLabels.csv')
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
        labels= {filedata: results,labeldata: req.body};
            console.log( labels);
            io.emit('loadDataSrcLabel1' ,labels);
        res.send('ok');
        });

    }, 60000);
});

router.post('/loadDataSrcRem',function(req,res){
    console.log('loadDataSrcRem');
   // console.log('user session : ' + req.sessions);
    io.emit('loadDataSrcRem' ,req.body);
    res.send('ok');
});

router.get('/loadFeatureLabels',function(req,res){  
        console.log('loadFeatureLabels');
        console.log(session.userdata);
        //io.emit('loadFeatureLabels' ,req.body);
        res.send('ok');    
});

router.post('/getmodelresult',function(req,res){
    console.log('modelresult');
    console.log(req.body);
    io.emit('onmodelresult',req.body);
    res.send('ok');
});

router.post('/getmodelexecution',function(req,res){
    console.log('modelexecution');
    console.log(req.body);
    io.emit('onmodelexecution',req.body);
    res.send('ok');
});

router.post('/getDataFeatures',function(req,res){
    console.log('data features');
    console.log(req.body);
    var results = [];
    // fs.createReadStream('./relationFiles/salesData-set.csv')
    // .pipe(csv())
    // .on('data', results.push)
    // .on('end', () => {
    //   console.log(results);

    fs.createReadStream('./relationFiles/'+req.body.filepath)
        .pipe(csv())
        .on('data', (data) => {
            //var fileData = data; 
            
            results.push(data);
            //console.log(results);
           
        })
        .on('end', () => {
            //   console.log(results);
        console.log(results);
        return res.json({filedata: results});
        });
});

router.post('/upload',function(req,res){
    console.log('upload body')
    //console.log(req);
    
    upload(req,res,function(err){
        console.log('upload');
        console.log(req.file.filename);
        fs.createReadStream('./uploads/'+req.file.filename)
        .pipe(csv())
        .on('headers', (headers) => {
            var fileHeaders = headers; 
            //fileHeaders =fileHeaders[0].replace(/";"/g , ",");
            //fheader = fileHeaders.split(",");
            if (fileHeaders[0].indexOf('";"') > -1) {
                fileHeaders = fileHeaders[0].split('";"') 
                }
            console.log('fileheaders');
            console.log(fileHeaders);
            if(err){
                return res.status().json({error:err})
            }
            return res.json({originalname:req.file.originalname,uploadname:req.file.filename,fileheader: fileHeaders})
        });
    });
});


router.post('/addS3Profiles',function(req,res){
    var data=req.body;
    console.log(data); 
    request({
    // url: 'http://192.168.23.180:7799/api/v1/transformedFeatures',
    url: CONFIGURATIONS.requestApi +'/api/connectoraddS3/profile',
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


router.post('/getS3Bucket',function(req,res){
    var data=req.body;
    console.log(data); 
    request({
    // url: 'http://192.168.23.180:7799/api/v1/transformedFeatures',
    url: CONFIGURATIONS.requestApi +'/api/connectorS3/getbuckets',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: data
    }, function(error, response, body) {
    res.send(body);


    });

});

router.post('/bucketProfile',function(req,res){
    var data;
    console.log('bucketProfile');
     console.log(req.body);
     io.emit('bucketProfile', req.body);
     res.send('OK');
 });

 router.post('/readS3File',function(req,res,next){
     console.log('reads3file');
    // console.log(req.body);

     var data=req.body;
    console.log(data); 
    request({
    // url: 'http://192.168.23.180:7799/api/v1/transformedFeatures',
    url: CONFIGURATIONS.requestApi +'/api/get/fileHeader',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: data
    }, function(error, response, body) {
    res.send(body);


     });
   // var s3 = new aws.S3({ accessKeyId: req.body.access_key, secretAccessKey: req.body.secret_key }); //create a s3 Object with s3 User ID and Key

    // //construct getParam
    // var getParams = {
    //     //Bucket: req.body.bucket,
    //     Bucket: 'bigdata-plat',
    //     Key: 'Items.csv'
    //     //Key: req.body.path
    // }

    //Fetch or read data from aws s3
    // s3.getObject(getParams, function (err, data) {

    //     if (err) {
    //         console.log('err');
    //         console.log(err);
    //     } else {
            
    //         console.log(data.Body.toString()); 
    //         console.log(data);
    //         console.log('s3 data soucre');
    //         //res.send(data.Body);
    //     }

    // })
});

 router.get('/getProfiles', function(req,res){ 
    request({
    url: CONFIGURATIONS.requestApi +'/api/connectorS3/getAll/profiles',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    }, function(error, response, body) {
        console.log('getprofiles');
        console.log(body);
    res.send(body);


    });
 });

 router.get('/getProblems',function(req,res){
    request({
        url: CONFIGURATIONS.requestApi +'/api/get/problems',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        }, function(error, response, body) {
            console.log('getproblems');
            console.log(body);
        res.send(body);
    
    
        });
 });



module.exports = router;