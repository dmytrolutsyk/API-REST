//Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');


//Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;


//Routes

module.exports = {
    CreateTraitement: function(req, res){
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var Title = req.body.Title;
        var Content = req.body.Content;

        if (Title == null || Content == null){
            return res.status(400).json({ 'error' : 'missing parameters' });
        }

        if (Title.length <= 2 || Content.length <= 4){
            return res.status(400).json({ 'error' : 'invalid parameters' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { id: userId}
                })
                .then(function(userFound){
                    done(null, userFound);
                })
                .catch(function(err){
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {
                if(userFound){
                    models.Traitement.create({
                        Title : Title,
                        Content : Content,
                        UserId : userFound.id
                    })
                    .then(function(newTraitement){
                        done(newTraitement);
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found'});
                }
            },
        ], function(newTraitement){
            if (newTraitement) {
                return res.status(201).json(newTraitement);
            } else {
                return res.status(500).json({ 'error': 'cannot post message'});
            }
        });
    },
    ListTraitement: function(req, res){ 
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order; 

        models.Traitement.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username']
            }]
        }).then(function(Traitement) {
            if (Traitement) {
                res.status(200).json(Traitement);
            } else {
                res.status(404).json({ "error": "no messages found"});
            }

        }).catch(function(err){
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    }     
}