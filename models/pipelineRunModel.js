/**
 * Created by Tahir on 12/14/2015.
 */
var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var runSchema = mongoose.Schema({

    _id:false,
    pipeline_id: String,
    version_id: String,
    in : [String],
    out : [String],
    position:Schema.Types.Mixed
});

module.exports = runSchema;