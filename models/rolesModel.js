var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var roleSchema = mongoose.Schema({
    title: String,
    user_id:String,


    permissions_array:Schema.Types.Mixed,
    //modules_array:[String],
    modules:Schema.Types.Mixed,
    permissions: Schema.Types.Mixed,
    pipelinePermissions: Schema.Types.Mixed,
    dashboardPermissions: Schema.Types.Mixed
});

module.exports = mongoose.model('Role',roleSchema);