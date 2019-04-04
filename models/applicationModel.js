var mongoose =  require('mongoose');
var timestamps = require('mongoose-timestamp'),
Schema = mongoose.Schema;

var StageAndVersionSchema = require("./StageAndVersionModel");
var configurationSchema = mongoose.Schema({
   property:String,
    value:String

});
var applicationsSchema = mongoose.Schema({
    name: String,
    parent_id:  {type:mongoose.Schema.Types.ObjectId , ref: 'Projects'},
    //pipeline_id: {type:mongoose.Schema.Types.ObjectId , ref: 'RPipeline'},
    user_id: {type:mongoose.Schema.Types.ObjectId , ref: 'Users'},
    created: {type: Date, default: Date.now()},
    app_type : String,
    file: {
        name: String,
        path: String
    },
    folder: {
        name: String
    },
    pipeline: {
        status:  {type: String, default: "new" },
        mode: {type: String, default: "development" },
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
        
        cores_per_node : {type : Number, default : 4 },
        storage_level : {type : String, default : 'MEMORY_AND_DISK_SER' },
        ram_per_node: {type : Number, default: 4 },
        debug:Boolean,
        is_scheduled : {type: Boolean, default: false},
        
        configurations:[configurationSchema],
        exported_jar:{type: String},
        //process_parameters:{type:mongoose.Schema.Types.ObjectId , ref: 'Parameter'}
        process_parameters:{},
        clusterInfo:  {type:mongoose.Schema.Types.ObjectId , ref: 'clusterData'},
        model:Schema.Types.Mixed
    }
    
});

applicationsSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('Applications',applicationsSchema);