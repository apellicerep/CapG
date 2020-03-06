const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {

    //get token from Header
    const token = req.header('x-auth-token')
    //Check token
    if (!token) {
        return res.status(401).json({ msg: "No token, access denied" })
    }
    try {
        const decoded = jwt.verify(token, "!secret928!!!")
        req.currentUser = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' })
    }
}