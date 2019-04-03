var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var runSchema = require("./pipelineRunModel");

var projectSchema = mongoose.Schema({
    name: String,
    user_id:String,
    user_pipelines:[{type:mongoose.Schema.Types.ObjectId , ref: 'RPipeline'}],
    shared_pipelines:[{type:mongoose.Schema.Types.ObjectId , ref: 'RPipeline'}],
    run: {
        mode:String,
        dag:[runSchema]
    },
    shared_with:[{type:mongoose.Schema.Types.ObjectId , ref: 'Users'}]
});

projectSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('Projects',projectSchema);