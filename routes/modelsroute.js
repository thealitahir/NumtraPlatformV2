var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/getAllModels',function(req,res){
    // var url='http://192.168.23.180:7799/api/v1/model/dashboard';
    var url= CONFIGURATIONS.requestApi +'/api/v1/model/dashboard';
    var data;
     request({
     url: url,
     method: 'POST',
     headers: {
     'Content-Type': 'application/json'
     }
     }, function(error, response, body) {
         console.log('all models response');
         console.log(body);
         res.send(body);

     });
});

router.get('/getModelSource/:id', function(req,res) {
    console.log('node routes');
    console.log(req.params);
        // var url='http://192.168.23.180:7799/api/v1/getModelSource/' + req.params.id;
        var url=CONFIGURATIONS.requestApi +'/api/v1/getModelSource/' + req.params.id;
        var data;
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

router.post('/createPrediction',function(req,res,next){
    var data=req.body;
        console.log(data);
          if(data.rel_data == 0){
                     var uri =  CONFIGURATIONS.requestApi +'/api/v1/prediction/transform';
                 } else if(data.rel_data == 1) {
                    var uri = CONFIGURATIONS.requestApi +'/api/v1/predictionRel/start';
                 }
                 console.log(uri);
    request({
        // url: 'http://192.168.23.180:7799/api/v1/prediction/transform',
        url: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: data
    }, function(error, response, body) {
        res.send(body);
        }
    );

});

router.post('/getPredictionNotify',function(req,res){
    console.log('Prediction notify');
    console.log(req.body);
    io.emit('onPredictionNotify',req.body);
    res.send('ok');
});

router.post('/getPredictionResult',function(req,res){
    console.log('Prediction result');
    console.log(req.body);
    io.emit('onPredictionResult',req.body);
    res.send('ok');
});

module.exports = router;