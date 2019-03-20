var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var stagesSchema = mongoose.Schema({

    field : String,
    alias : String,
    position : String,
    type : String,
    //to store the information in which stage the field is created
    created_in: {type:mongoose.Schema.Types.ObjectId , ref: 'stages'},
    // Just for UI to save information whether this field is the part of selected_schema or not.
    checked : {type:Boolean, default:true},
    // for UI visual clues to check whether a field is created on current stage or inherited from parent
    inherited: {type:Boolean, default:true},
    is_categorical: {type:Boolean, default:false},
    date_time_format:String,
    replacement:String,
    bad_values:{type:String, default:""},
    nullable:{type:String, default:"true"},
    path:String

});

module.exports = stagesSchema;