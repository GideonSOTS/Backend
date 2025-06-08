const jwt = require('jsonwebtoken')

const getToken  = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'5m'})
}

module.exports = getToken;