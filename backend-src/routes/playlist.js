const mongoose = require('mongoose'),
      db = require('../models')
      express = require('express'),
      router = express.Router(),
      

router.post('/', function(req, res){
    db.Playlist.create(req.body, function(err, playlist){
        if(err) {
            res.status(500).send(err);
        } else {
            let obj = {};
            obj['name'] = playlist['name'];
            db.User.findOne(req.userId).then(function(user){
                user.playlist.push(playlist._id);
                user.save();
                obj['userId']=user._id;
            }).then(res.send(obj));
        }
    })
})

router.get('/:id', function(req, res){
    let id = req.params.id;
    db.Playlist.findById(id).then(function(playlist){
        res.json(playlist);
    }).catch(function(err){
        if(err)
        {
            res.status(500).json({
                message: 'Playlist doesn\'t exsist'
            });   
        }
    });
})

router.post('/:id', function(req, res){
    let id = req.params.id;
    let song = req.body.song;
    db.Playlist.findOneAndUpdate({_id: id}, {$set: {songs: song}}).then(function(playlist){
        res.status(200).json({
            message: 'Playlist Saved Successfully!!',
            playlist
        });
    }).catch(function(err){
        res.status(500).json({
            message: 'Unable to save song!!'
        })
    });
});
module.exports = router;