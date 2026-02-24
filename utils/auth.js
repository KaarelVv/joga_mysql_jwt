const { verifyToken } = require('./jwt')

function parseAuthHeader(req) {
    const header = req.headers['authorization']
    const [type, token] = header ? header.split(' ') : [null, null]
    if (type === 'Bearer' && token) {
        return token
    }
    return null
}

function requireAuth(req, res, next) {
    const token = parseAuthHeader(req)
    if (!token) {
        return res.status(401).send('Unauthorized')
    }
    try {
        const payload = verifyToken(token)
        req.user = payload
        next()
    } catch (err) {
        return res.status(401).send('Invalid token')
    }
}

function requireRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next()
        } else {
            return res.status(403).send('Forbidden')
        }
    }
}

module.exports = {
    requireAuth,
    requireRole
}
