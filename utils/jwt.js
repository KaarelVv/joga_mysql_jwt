const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'thisismysecretkey'

function generateToken(payload) {
    return jwt.sign(payload, secret, 
        { expiresIn:process.env.JWT_EXPIRES_IN || '1h' })
}


function verifyToken(token) {
    return jwt.verify(token, secret)
}



module.exports = {
    generateToken,
    verifyToken
}
