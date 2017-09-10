'use strict';
const   mongoose = require('mongoose'),
        Artist   = require('./../models/artist'),
        User     = require('./../models/user'),
        promise  = require('promise');

class Player {

    getAllArtists(type) {
        return new Promise((resolve, reject) => {
            Artist.find({musictype: `${type}`}, '-_id',
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });
        });
    };
    
    getArtistByName(name) {
        return new Promise((resolve, reject) => {
            Artist.find({name: `${name}`}, '-_id',
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });
        });
    };

    getArtistBySong(song_id) {
        return new Promise((resolve, reject) => {
            Artist.find({'songs.id': song_id}, '-songs -_id',
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });
        });
    };

    getUserByMail(user_email) {
        return new Promise((resolve, reject) => {
            User.findOne({mail: user_email}, '-_id -mixes',
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });
        });
    };
    //need to change nameing after restructre 
    getMixByUserID(email, mix_id) {
        return new Promise((resolve, reject) => {
            User.findOne({mail: `${email}`, 'mixes.id': `${mix_id}`}, 'mixes -_id',
                (err, result) => {
                    if (err) reject (err);
                    else {
                        if (!result)
                            resolve(err);
                        else
                        {   
                            let mix;
                            for (let i in result.mixes){ 
                                if (result.mixes[i].id == mix_id){
                                    mix = result.mixes[i];
                                    break;
                                }
                            }
                            resolve (mix);   
                        }
                    }
                });
        });
    };

    getSongsFromMix(user_id, mix_id) {
        return new Promise((resolve, reject) => {
            User.findOne({id: `${user_id}`, 'mixes.id': `${mix_id}`}, 'mixes -_id',
                (err, result) => {
                    if (err) reject (err);
                    else {
                        if (!result)
                            resolve(err);
                        else
                        {   
                            //ToDo 20/06/2017 - fix the bug that findOne gets all the mixes from user
                            //the following code is a plaster to pick the mix with mix_id
                            let mix = [];
                            for (let i in result.mixes){ 
                                if (result.mixes[i].id == mix_id){
                                    mix = result.mixes[i];
                                    break;
                                }
                            }
                            resolve (mix);   
                        }
                    }
                });
        });
    };

    getSongsByArtist(name) {
        return new Promise((resolve, reject) => {
            Artist.find({name: `${name}`},
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result[0].songs);
                });
        });
    };

    getSong(song_id) {
        return new Promise((resolve, reject) => {
            Artist.findOne({'songs.id': `${song_id}`},
                (err, result) => {
                    if (err) reject (err);
                    else {
                        if (!result)
                            resolve(err);
                        else
                        {
                            let songs = result._doc.songs;
                            for (let i in songs){
                                if (songs[i].id == song_id)
                                    resolve(songs[i]);
                            }    
                        }
                    } 
                });
        });
    };

    removeSongFromMix(email, mix_id, song_id) {
        return new Promise((resolve, reject) => {
            User.update({mail: `${email}`, 'mixes.id': `${mix_id}`},
                        { $pull: {'mixes.$.song': `${song_id}`}},
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });    
        });
    };

    addSongToMix(email, mix_id, song_id) {
        return new Promise((resolve, reject) => {
            User.update({mail: `${email}`, 'mixes.id': `${mix_id}`},
                        { $push: {'mixes.$.song': `${song_id}`}},
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });    
        });
    };    

    addLike(song_id) {
        return new Promise((resolve, reject) => {
            Artist.update(
                { 'songs.id': `${song_id}` },
                {$inc:{'songs.$.likes': 1}},
                (err, result) => {
                    if (err) reject (err);
                    else resolve (result);
                });
       });
    }

    getBestSongByArtist(name) {
        return new Promise((resolve, reject) => {
            Artist.find({name: `${name}`}, 'songs -_id',
                (err, result) => {
                    if (err) reject (err);
                    else{
                        console.log(result[0].songs[1]);
                        var max = -1,
                        bestSong;
                        for(let i in result[0].songs){
                            if(result[0].songs[i].likes > max)
                            {
                                max = result[0].songs[i].likes;
                                bestSong = result[0].songs[i];
                                console.log(bestSong);

                            }
                        }
                        resolve (bestSong);
                    } 
                        
                });
        });
    };

    getMixes() {
        return new Promise((resolve, reject) => {
            User.find({'mixes.name': { $ne: 'המיקסטייפ הראשון שלי' }}, '-_id -id -mail -birthday -password -favourites',
                (err, result) => {
                    let mixes = [];
                    if (err) reject (err);
                    else resolve (result); 
                });
        });
    }

// ----------------------create user---------------------------
     createNewUser(user) {
        return new Promise((resolve, reject) => {
            var newUser = new User({
                name: `${name}`,
                id: 726,
                mail: `${mail}`,
                birthday: `${birthday}`,
                password: `${password}`,
                musictype: `${musictype}`,
                //favorites: `${favorites}`,
                //mixes: `${mix[]}`
            });
            console.log(user);
            newUser.save(
                (err) => {
                    if(err)
                      console.log(`err: ${err}`);
                });
            });
        };
}
module.exports = () => {
    var player = new Player();
    return player;
}