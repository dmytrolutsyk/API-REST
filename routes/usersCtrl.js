//Imports

var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var models = require('../models');


//Routes

module.exports = {
    register: function(req, res){
        // Params
        var UserName = req.body.UserName;
        var PassWord = req.body.PassWord;
        var PassWordOk = req.body.PassWordOk;

        if (UserName == null || PassWord == null || PassWordOk == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User.findOne({
            attributes: ['UserName'],
            where: { UserName: UserName}
        })
        .then(function(userFound){
            if(!userFound) {
                bcrypt.hash(PassWord, 5, function(err, bcryptedPassword){
                    var newUser = models.User.create({
                        UserName: UserName,
                        PassWord: bcryptedPassWord,
                        PassWordOk: PassWordOk
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user'});
                    });                
                });

            } else {
                return res.status(409).json({ 'error': 'user already exit'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'unable to verify'});
        })


    },
    login: function(req, res){
        //TODO: To implement
    }
}

