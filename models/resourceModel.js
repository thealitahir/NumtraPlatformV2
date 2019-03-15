
var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var resourceSchema = mongoose.Schema({
    title: String,
    url: String
});

module.exports = mongoose.model('Resource',resourceSchema);