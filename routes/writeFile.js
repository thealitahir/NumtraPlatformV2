var express = require('express');
var router =  express.Router();
var request = require("request");
var jsonexport = require('jsonexport');
var fs = require('fs');

router.post('/writeCsv', function(req,res) {
    //console.log(req.body);
    var dataToWrite ='';
    jsonexport(req.body.filedata,function(err, csv){
        if(err) return console.log(err);
        //console.log(csv);
        dataToWrite =  csv;
    });
    var file= new Date().getTime();
    fs.writeFile('./sampleData/'+file+'.csv', dataToWrite, function (err) {
    if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
        res.send({status: false, messaage:'file not saved'});
    } else{
        console.log('file saved');
        res.send({filepath:'./sampleData/'+file ,data:req.body.filedata , status:true, messaage:'file saved'});
    }
    });
});


module.exports = router;