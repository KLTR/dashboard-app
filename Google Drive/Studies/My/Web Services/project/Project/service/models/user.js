var mongoose = require('mongoose'),
    schema   = mongoose.Schema,

    UserSchema = new schema({
        id: {type:Number, index:1, required:true, unique:true},
        name: String,
        mail: {type:String, index:1, required:true, unique:true},
        birthday: String,
        password: String,
        musictype: String,
        favourites: [String],
        mixes: [{
            id: {type:Number, index:1, required:true, unique:true},
            name: String,
            photo: String,
            song: [Number]
        }]
    }, {collection: 'User'});
    
var User = mongoose.model('User', UserSchema);


module.exports = User
