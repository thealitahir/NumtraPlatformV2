var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var sectionSchema = mongoose.Schema({
    title:String,
    resource_id: {type:mongoose.Schema.Types.ObjectId , ref: 'Resource'}
});

module.exports = mongoose.model('Section',sectionSchema);