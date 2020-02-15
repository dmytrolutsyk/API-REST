//Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET ='jfsjdJBDF56JB546J588hjbhjb7HBJ';

//Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}