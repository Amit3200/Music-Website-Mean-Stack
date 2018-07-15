const mongoose = require('mongoose')
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MusicApp');
module.exports.Playlist = require('./playlist');
module.exports.User = require('./auth');