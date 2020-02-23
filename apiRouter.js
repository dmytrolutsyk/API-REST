//Imports
var express =  require('express');
var usersCtrl = require('./routes/usersCtrl');
var traitementCtrl = require('./routes/traitementCtrl');

//Router
exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);

    // Traitements routes
    apiRouter.route('/traitement/new/').post(traitementCtrl.CreateTraitement);
    apiRouter.route('/traitement/').get(traitementCtrl.ListTraitement);

    return apiRouter;
})();