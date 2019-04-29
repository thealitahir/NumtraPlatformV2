var express = require('express');
var router = express.Router();
var request = require("request");
// var Roles = require('../models/rolesModel');
var StageVersionModel = require("../models/stageVersionModel");
var PipelineVersion = require("../models/pipelineVersionModel");
var DataTypeModel = require("../models/datatypesModel");
var ObjectId = require("mongoose").Types.ObjectId;

router.post('/updateStage', function (req, res) {
  var stagedata = req.body;
  //StageVersionModel.update({"name":stagedata.stageName, "user_id":req.user._id}, {$set: stagedata['updatedata'] }, function (err, sdata) {
  StageVersionModel.update({ "_id": stagedata.stage_id, "user_id": "567a95c8ca676c1d07d5e3e7" }, { $set: stagedata['updatedata'] }, function (err, sdata) {
    if (!err) {
      res.send({ status: true, msg: 'stage updated successfully.', data: sdata });
    }
    else {
      console.log('err');
      console.log(err);
      res.send({ status: false, msg: 'stage not saved.' });
    }
  });

})

router.post('/linkStages', function (req, res) {
  var target_id = req.body.target;
  var source_id = req.body.source;
  StageVersionModel.findOneAndUpdate({ _id: source_id }, { $push: { out: target_id } }, { new: true }, function (err, source) {
    if (!err) {
      StageVersionModel.update({ _id: target_id }, {
        $set: { "original_schema": source.original_schema },
        $push: { in: source_id }
      }, function (err, lsdata) {
        if (!err) {
          res.send({ status: true, msg: 'linkstage updated successfully.', data: lsdata });
        }
        else {
          res.send({ status: false, msg: 'linkstage not saved.' });
        }
      });

    }
    else {
      res.send({ status: false, msg: 'error in getting stagedata .' });
    }
  });

});

router.post('/removeLink', function (req, res) {
  var target_id = req.body.target;
  var source_id = req.body.source;
  StageVersionModel.findOneAndUpdate({ _id: source_id }, { $pull: { out: target_id } }, { new: true }, function (err, source) {
    if (!err) {
      StageVersionModel.update({ _id: target_id }, {
        $set: { "original_schema": [] },
        $pull: { in: source_id }
      }, function (err, lsdata) {
        if (!err) {
          console.log('linkstage updated successfully');
          res.send({ status: true, msg: 'linkstage updated successfully.', data: lsdata });
        }
        else {
          res.send({ status: false, msg: 'linkstage not saved.' });
        }
      });

    }
    else {
      console.log('error in getting stagedata');
      res.send({ status: false, msg: 'error in getting stagedata .' });
    }
  });
});


router.get('/stageSchema/:stage_id', function (req, res) {
  StageVersionModel.findOne({ _id: req.params.stage_id }, function (err, stageschema) {
    if (!err) {
      res.send({ status: true, msg: 'get stage schema successfully.', data: stageschema });
    }
    else {
      console.log('error in getting stage schema .');
      res.send({ status: false, msg: 'error in getting stage schema .' });
    }
  });

})

router.post('/getPipelineResult', function (req, res) {
  io.emit('onPipelineData', req.body);
  res.send('OK');
});

router.post('/executePipeline', function (req, res, next) {
  var data = req.body;
  console.log("execute pipeline : ", data);
  var url = CONFIGURATIONS.platformRequestApi + '/api/start/codegen';
  request({
    url: 'http://216.168.41.41:2020/api/start/codegen',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  }, function (error, response, body) {
    console.log('add data response');
    res.send(body);
    res.send(error);

  });
});

router.post('/saveCanvasModel', function (req, res) {
  console.log("in save canvas model");
  var stage = req.body;
  console.log(stage.mongoId);
  if (stage.mongoId == null) {
    var stage_version = {};
    stage_version.pipeline_id = stage.pipeline_id;
    stage_version.sub_type = stage.attributes.label.text;
    stage_version.stage_type = stage.attributes.label.type;
    stage_version.stage_attributes = stage.stage_attributes;
    stage_version.status = "new";
    stage_version.position = stage.position;
    stage_version.shape_attributes = stage.attributes;
    stage_version.shape_size = stage.size;
    stage_version.shape_type = stage.type;
    stage_version.user_id = ObjectId('567a95c8ca676c1d07d5e3e7');

    StageVersionModel.create(stage_version, function (err, result) {
      if (!err) {
        console.log("added stage");
        console.log(result);
        res.send({ status: true, msg: 'new stage added', data: result });
      }
      else {
        res.send({ status: false, msg: 'Component not saved.' });
      }

    });

  }
  else {
    StageVersionModel.findOneAndUpdate({ _id: stage.mongoId },
      {
        $set:
        {
          "shape_attributes": stage.attributes,
          "position": stage.position,
          "shape_size": stage.size,
          "shape_type": stage.type
        }
      },
      { new: true }, function (err, lsdata) {
        if (!err) {
          console.log('stage attribute updated successfully');
          res.send({ status: true, msg: 'stage attribute updated successfully', data: lsdata });
        }
        else {
          console.log('stage attribute not updated.');
          res.send({ status: false, msg: 'stage attribute not updated.' });
        }
      });
  }

});

router.delete('/removeStage/:stage_id', function(req,res){
  console.log("in remove stage");
  console.log(req.params.stage_id);
  var ins,outs = [];
  StageVersionModel.findOne({ _id: req.params.stage_id }, function (err, stage) {
    if (err) {
      res.send({ status: false, msg: 'Unable to get stages' });
    }
    else{
        ins = stage.in;
        outs = stage.out;
        console.log(ins,outs);
        removeIns(ins,outs,req.params.stage_id,res);
    }
  });
});

router.get('/getCanvasModel/:pipeline_id', function (req, res) {
  StageVersionModel.find({ pipeline_id: req.params.pipeline_id }).exec(function (err, data) {
    if (err) {
      console.log('Unable to get stages');
      res.send({ status: false, msg: 'Unable to get stages' });
    }
    else {
      console.log('stages found');
      res.send({ status: true, msg: 'stages found.', data: data });
    }
  });
});

router.get('/getDataTypes', function (req, res) {
  DataTypeModel.find().exec(function (err, data) {
    if (err) {
      res.send({ status: false, msg: 'Unable to get datatypes' });
    }
    else {
      console.log('datatypes found');
      res.send({ status: true, msg: 'datatypes found.', data: data });
    }
  });
});


function removeIns(ins, outs, stage_id, res) {
  console.log("==========ins==========");
  console.log(ins);
  if(ins.length < 1){
    removeOuts(outs, stage_id, res);
  }
  else{
    for (var i = 0; i < ins.length; i++) {
      StageVersionModel.updateOne({ _id: ins[i] }, { $pull: { out: ins[i] } }, function (err, data) {
        if (err)
          return;
        else {
          if (i == ins.length - 1) {
            removeOuts(outs, stage_id, res);
          }
        }
      });
    }
  }
  
}

function removeOuts(outs, stage_id, res) {
  console.log("===========outs===========");
  console.log(outs);
  if(outs.length < 1){
    StageVersionModel.deleteOne({ _id: stage_id }, function (err, data) {
      if (err) {
        res.send({ status: false, msg: 'Unable to delete stage' });
      }
      else {
        res.send({ status: true, msg: 'stage deleted successfully', data: data });
      }
    });
  }
  else{
    for (var i = 0; i < outs.length; i++) {
      StageVersionModel.updateOne({ _id: outs[i] }, { $pull: { in: outs[i] } }, function (err, data) {
        if (err)
          return;
        else {
          if (i == ins.length - 1) {
            StageVersionModel.deleteOne({ _id: stage_id }, function (err, data) {
              if (err) {
                res.send({ status: false, msg: 'Unable to delete stage' });
              }
              else {
                res.send({ status: true, msg: 'stage deleted successfully', data: data });
              }
            });
          }
        }
      });
    }
  }
  
}

module.exports = router;