const mongoose = require('mongoose'),
      db = require('../models'),
      jwt = require('jsonwebtoken'),
      config = require('../config');

exports.authenticate = function(req, res, next){
    let token = req.headers['x-access-token'];
    if(!token)
        {
        return res.status(403).send({ 
            auth: false, 
            message: 'Unauthorized Acesss!!'});
        }
        jwt.verify(token, config.secret, function(err, decoded){
            if(err)
            {
                return res.status(500).send({
                    auth: false,
                    message: 'Invalid or corrupted authentication token!!'
                });
            }
            req.userId = decoded.id;
            next();
        });
}

module.exports = exports;