const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('authtoken')
        
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })
        
        const decoded = jwt.verify(token, 'jwtsecret')
        
        req.user = decoded.user
        
        next()
    }
    catch (err) {
        // error
        // console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.adminCheck = async (req, res, next) => {
    try{
        const userAdmin = await User.findOne({username: req.user.username}).select('-password').exec()

        if (userAdmin.role !== 'admin') {
            return res.status(403).json({msg: 'Admin resource! Access denied'})
        }else{
            next()
        }

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}