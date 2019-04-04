var express = require('express');
var router =  express.Router();
var request = require("request");

router.post('/getdataSource',function(req,res){
    var documentClient = require("documentdb").DocumentClient;

    var endpoint = req.body.domain;
    var primaryKey = req.body.key;
    var client = new documentClient(endpoint, { "masterKey": primaryKey });

    var databaseUrl = `dbs/`+ req.body.db;    
    var collectionUrl = `${databaseUrl}/colls/`+req.body.container;

    // var endpoint = 'https://doctorwho.documents.azure.com:443/';
    // var primaryKey = "SPSVkSfA7f6vMgMvnYdzc1MaWb65v4VQNcI2Tp1WfSP2vtgmAwGXEPcxoYra5QBHHyjDGYuHKSkguHIz1vvmWQ==";//config.authKey;
    // var client = new documentClient(endpoint, { "masterKey": primaryKey });

    // var databaseUrl = `dbs/DepartureDelays`;    
    // var collectionUrl = `${databaseUrl}/colls/flights_pcoll`;

    var querySpec = {
        'query': req.body.query
    }
    client.queryDocuments(collectionUrl, querySpec, { enableCrossPartitionQuery: true }).toArray(function(err, results) {
        if(err) return console.log(err);
        if(results){
            res.send(results);
        }
    });
});



module.exports = router;