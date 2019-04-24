var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var datatypesSchema = mongoose.Schema({

    type : String,
    value: String

});

module.exports = mongoose.model('dataTypes',datatypesSchema);
