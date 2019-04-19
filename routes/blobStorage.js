var express = require('express');
var router =  express.Router();
var request = require("request");
var CryptoJS = require("crypto-js");
var parseString = require('xml2js').parseString;

router.post('/getContainers', function(req,res) {
    var storageAccount = 'numtrablobstoragebell21';
    var accountKey = 'gZyp8x/VslXGQZLR8XkGgjeGzvLbZmNfDIxbqRlvHfPiCVz3r/4Xnc/hzdAapqLa9ao1AjZbKQDZs2ht+xkbxg==';
    var date = (new Date()).toUTCString();
    var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + date + '\nx-ms-version:2015-12-11\n/numtrablobstoragebell21/\ncomp:list';
    // var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + date + '\nx-ms-version:2015-12-11\n/numtrablobstoragebell21/blobstoragebell/file1.txt';
    // var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + date + '\nx-ms-version:2015-12-11\n/numtrablobstoragebell21/blobstoragebell/\ncomp:list\nrestype:container';
    
    var secret = CryptoJS.enc.Base64.parse(accountKey);
    var hash = CryptoJS.HmacSHA256(strToSign, secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    var auth = "SharedKey " + storageAccount + ":"+hashInBase64; 

    var url= 'https://numtrablobstoragebell21.blob.core.windows.net/?comp=list';
    // var url= 'https://numtrablobstoragebell21.blob.core.windows.net/blobstoragebell/file1.txt';
    // var url= 'https://numtrablobstoragebell21.blob.core.windows.net/blobstoragebell/?restype=container&comp=list';
    request({
        url: url,
        method: 'GET',
        headers: {
            'x-ms-date': date,
            'x-ms-version': '2015-12-11',
            'Authorization': auth  ,
        },
    }, function(error, response, body) {
        parseString(body, function (err, result) {
            res.send(result.EnumerationResults.Containers);
        });  
    });
});

router.post('/getBlobsList', function(req,res) {
    var storageAccount = req.body.accountName;
    var accountKey = req.body.accountKey;
    var container = req.body.container;
    var date = (new Date()).toUTCString();
    var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + date + '\nx-ms-version:2015-12-11\n/'+storageAccount+'/'+container+'/\ncomp:list\nrestype:container';
    
    var secret = CryptoJS.enc.Base64.parse(accountKey);
    var hash = CryptoJS.HmacSHA256(strToSign, secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    var auth = "SharedKey " + storageAccount + ":"+hashInBase64; 

    var url= 'https://'+storageAccount+'.blob.core.windows.net/'+container+'/?restype=container&comp=list';
    request({
        url: url,
        method: 'GET',
        headers: {
            'x-ms-date': date,
            'x-ms-version': '2015-12-11',
            'Authorization': auth  ,
        },
    }, function(error, response, body) {
            parseString(body, function (err, result) {
            res.send(result.EnumerationResults.Blobs);
        });  
    });
});

router.post('/getBlob', function(req,res) {

    var storageAccount = req.body.accountName;
    var accountKey = req.body.accountKey;
    var container = req.body.container;
    var blob = req.body.blob; 
    var date = (new Date()).toUTCString();
    var strToSign = 'GET\n\n\n\n\n\n\n\n\n\n\n\nx-ms-date:' + date + '\nx-ms-version:2015-12-11\n/'+storageAccount+'/'+container+'/'+ blob;
    
    var secret = CryptoJS.enc.Base64.parse(accountKey);
    var hash = CryptoJS.HmacSHA256(strToSign, secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    var auth = "SharedKey " + storageAccount + ":"+hashInBase64; 


    var url= 'https://'+storageAccount+'.blob.core.windows.net/'+container+'/'+blob;
    request({
        url: url,
        method: 'GET',
        headers: {
            'x-ms-date': date,
            'x-ms-version': '2015-12-11',
            'Authorization': auth  ,
        },
    }, function(error, response, body) {

        var filedata =[];
            filedata = body.split("\n");
            var fileheader=[];
            fileheader = filedata[0].split(",");
            filedata.shift();
            filedata.length =10;
            var fh=[];
            var fd=[];
            
            for(var i=0 ; fileheader.length > i; i++){
                var head= { 
                    field : String,
                    alias : String,
                    position : String,
                    type : String,
               };
                head.field = fileheader[i].split(":")[0];
                head.alias = fileheader[i].split(":")[0];
                head.type = fileheader[i].split(":")[1];
                head.position = i+1;
                fh.push(head);
            }
            for(var j=0 ; j < filedata.length; j++){
                var fdobj={};
                for(var i=0 ; i < fh.length; i++){
                    var head = fh[i];
                    fdobj[head.field]= filedata[j].split(",")[i] ;  
                }
                fd.push(fdobj);               
            }
            var fdata={fileheader:fh, filedata:fd}    
                res.send(fdata);  
    });
});
    
module.exports = router;