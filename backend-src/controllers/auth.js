var db = require('../models');
var jwt = require('jsonwebtoken');
const config = require('../config');
const SECRET_KEY = config.secret;
exports.signup = function(req,res,next) {
    db.User.create(req.body).then(function(user){
        var token = jwt.sign({userId: user.id}, process.env.SECRET_KEY || SECRET_KEY,{
            expiresIn: 86400
        });
        var message='New User Created!!';
        var favourite_id;
        db.Playlist.create({name: 'Favourites', songs: []}).then(function(favourite){
            favourite_id = favourite.id;
            console.log(user);
            user.playlist.push(favourite);
            user.save(function(err){
                if(err)
                {
                    message: 'Unable to create new playlist!!!';
                }
            });
        }).then(function(){
                res.status(200).json({
                userId: user.id,
                username: user.username,
                playlist: favourite_id,
                message: message,
                token: token
            });
        });
        }).catch(function(err){
            res.status(400).json(err);
        });
}

exports.signin = function(req,res,next) {
    db.User.findOne({ username: req.body.username }).then(function(user) {
        user.comparePassword(req.body.password, function(err, isMatch){
            if(isMatch) {
                var token = jwt.sign({userId: user.id}, SECRET_KEY);
                res.status(200).json({
                    userId: user.id,
                    username: user.username,
                    playlist: user.playlist,
                    token: token
                });
            } else {
                res.status(400).json({
                    message: 'Wrong Password!!'
                });
            }
        });
    }).catch(function(err) {
        res.status(400).json({
            message: 'Wrong Username!!'
        });
    });
};

module.exports = exports;