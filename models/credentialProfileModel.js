var mongoose =  require('mongoose'),
    Schema = mongoose.Schema;

var credentialProfileSchema = mongoose.Schema({
    name:String,
    domain:String,
    token:String,
    user_id:{type:mongoose.Schema.Types.ObjectId , ref: 'Users'}
});

module.exports = mongoose.model('CredentialProfile',credentialProfileSchema);