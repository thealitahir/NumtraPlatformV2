var mongoose =  require('mongoose');
var timestamps = require('mongoose-timestamp'),
Schema = mongoose.Schema;

var StageAndVersionSchema = require("./StageAndVersionModel");
var configurationSchema = mongoose.Schema({
   property:String,
    value:String

});
var pipelineVersionSchema = mongoose.Schema({
    status:  {type: String, default: "new" },
    mode: {type: String, default: "development" },
    application_id:  {type:mongoose.Schema.Types.ObjectId , ref: 'Applications'},
    pipeline_id: {type:mongoose.Schema.Types.ObjectId , ref: 'RPipeline'},
    start_time : String,
    end_time : String,
    recurrence : String,
    progress : Number,
    nominal_time : String,
    spark_job_id : String,
    ramModal: {type : Number, default : 2 },
    clusterIP:String,
    clusterGroup:String,
    sparkIP:String,
    sparkPort:String,
    backEndPort:String,
    stages : [StageAndVersionSchema],
    user_id: {type:mongoose.Schema.Types.ObjectId , ref: 'Users'},
    cores_per_node : {type : Number, default : 4 },
    storage_level : {type : String, default : 'MEMORY_AND_DISK_SER' },
    ram_per_node: {type : Number, default: 4 },
    debug:Boolean,
    is_scheduled : {type: Boolean, default: false},
    created: {type: Date, default: Date.now()},
    configurations:[configurationSchema],
    exported_jar:{type: String},
    //process_parameters:{type:mongoose.Schema.Types.ObjectId , ref: 'Parameter'}
    process_parameters:{},
    clusterInfo:  {type:mongoose.Schema.Types.ObjectId , ref: 'clusterData'},
    model:Schema.Types.Mixed
});

pipelineVersionSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('PipelineVersion',pipelineVersionSchema);