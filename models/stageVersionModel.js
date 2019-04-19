var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;
var fieldsSchema = require("./fieldSchemaModel");
var timestamps = require('mongoose-timestamp');
var stageVersionSchema = mongoose.Schema({

    name: String,
    project_id:  {type:mongoose.Schema.Types.ObjectId , ref: 'Projects'},
    pipeline_id:  {type:mongoose.Schema.Types.ObjectId , ref: 'Applications'},
    mode: {type: String, default: "staged"},
    stage_type : String,
    sub_type : String,
    pipeline_name: String,
    dashboard_status: String,
    last_run: String,
    last_successful_run: String,
    stage_attributes: Schema.Types.Mixed,
    original_schema: [fieldsSchema],
    selected_schema: [fieldsSchema],
    //notifiers: [],
    //in: [StageAndVersionSchema],
    //out: [StageAndVersionSchema],
    in: [],
    out: [],
    icon:String,
    status:String,
    start_time:String,
    end_time:String,
    time_elapsed:String,
    position:Schema.Types.Mixed,
    user_id:String,
    error_msg:String,
    profile_id : String,
    is_streaming : {type: Boolean, default: false},
    valid: {type:Boolean, default:false},
    partition:Schema.Types.Mixed,
    is_predefined:{type: Boolean, default: false},
    cache:{type: Boolean, default: false},
    shape_attributes: Schema.Types.Mixed,
    shape_size: Schema.Types.Mixed,
    shape_type: String,
    shape_id: String
});

stageVersionSchema.plugin(timestamps, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = mongoose.model('StageVersion',stageVersionSchema);
