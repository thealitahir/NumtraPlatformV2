var mongoose = require("mongoose");
var StageAndVersionSchema = mongoose.Schema({
    _id: false,
    stage_id: {type:mongoose.Schema.Types.ObjectId , ref: 'rStage'},
    version_id: {type:mongoose.Schema.Types.ObjectId , ref: 'StageVersion'}
});

module.exports = StageAndVersionSchema;