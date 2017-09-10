var mongoose = require('mongoose'),
    schema   = mongoose.Schema,
    
    ArtistSchema = new schema({
        name: {type:String, required:true},
        photo: String,
        musictype: String,
        songs:[{ 
            id: {type:Number},
            name: String,
            likes: Number,
            duration: String,
            src: String
        }]
    }, {collection: 'Artist'});

var Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;