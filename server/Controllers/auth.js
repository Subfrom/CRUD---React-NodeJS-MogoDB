const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        // code
        const { username, email, password } = req.body
        // simple validation
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        // check for existing user
        var user = await User.findOne({ email, username })

        if (user){
            return res.status(400).json({ msg: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)

        user = new User({
            username,
            email,
            password
        })

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.status(200).json({ msg: 'Register Success' })
    }
    catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.login = async (req, res) => {
    try {
        // code
        const { email, password } = req.body
        // simple validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        // check for existing user
        var user = await User.findOneAndUpdate({ email }, { new: true })
        if (user)
        {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: 'Password Invalid' })
            
            var payload = {
                user: {
                    username: user.username,
                    email: user.email
                }
            }

            jwt.sign(payload, 'jwtsecret', { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.status(200).json({ token, payload })
            })
        }else{
            return res.status(400).json({ msg: 'User not Found' })
        }

    }
    catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}