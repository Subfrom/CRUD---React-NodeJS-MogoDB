const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })
        
        const decoded = jwt.verify(token, 'jwtsecret')
        
        req.user = decoded.user
        
        next()
    }
    catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}