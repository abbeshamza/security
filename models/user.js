var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/nodeauth');
var db= mongoose.connection;
var UserSchema = mongoose.Schema({
    username:{
        type :String,
        index :true
    },
    password :{
        type :String, required : true , bcrypt : true
    },
    name:{
        type :String
    },
    email:{
        type :String
    },
    role:{
        type :String
    }
});
module.exports.getUserByUsername=function(username , callback){
    var query = {username : username};
    User.findOne(query,callback);
}
module.exports.comparePawd=function(condidatePawd,hash,callback){

    bcrypt.compare(condidatePawd,hash,function(err,isMatch){
        if(err) {return callback(err);
        }
        callback(null,isMatch);
    })
}
var User = module.exports = mongoose.model('User',UserSchema);
module.exports.createUser = function (newUser , callback) {
    bcrypt.hash(newUser.password,10,function(err,hash){
        if(err) throw  err;
        newUser.password=hash;
        newUser.save(callback)

    })
newUser.save(callback);
    
}