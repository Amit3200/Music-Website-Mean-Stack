const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    songs: [{
        type: Number
    }]
});

module.exports = mongoose.model('playlist', Schema);