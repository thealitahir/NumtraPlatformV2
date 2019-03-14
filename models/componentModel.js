var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var componentSchema = mongoose.Schema({
    title:String,
    subType:String,
    stageType:String,
    icon:String,
    is_streaming:Boolean,
    stage_attributes: Schema.Types.Mixed,
    section_id: {type:mongoose.Schema.Types.ObjectId , ref: 'Section'}
});

module.exports = mongoose.model('Component',componentSchema);