const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { notify, getIPClient } = require('../Functions/Notify')
require('dotenv').config()

exports.register = async (req, res) => {
    try {
        // code
        const { username, email, password } = req.body
        // simple validation
        if (!username || !email || !password) {
            return res.send('Please enter all fields').status(400)
        }
        // check for existing user
        var user = await User.findOne({ email, username })

        if (user){
            return res.send('User Already Exists!!!').status(400)
        }

        const salt = await bcrypt.genSalt(10)

        user = new User({
            username,
            email,
            password
        })

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.send('Register Success!!').status(200)
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
        const ip = await getIPClient(req);
        const { email, password } = req.body
        // simple validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        // check for existing user
        var user = await User.findOneAndUpdate({ email }, { ip: ip }, { new: true })
        if (user)
        {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: 'Password Invalid' })
            
            var payload = {
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }

            const token = process.env.LINE_NOTIFY_TOKEN;

            const text = 'User: ' + user.username + ' has logged in from IP: ' + ip;
            await notify(token, text);

            jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
                if (err) throw err
                res.status(200).json({ token, payload })
            })
        }else{
            const text =
              "User: " + email + " has tried to login from IP: " + ip;
            await notify(token, text);
            return res.status(400).json({ msg: 'User not Found' })
        }

    }
    catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password').exec()

        if (user) {
            res.status(200).json({ user: user })
        } else {
            res.status(400).json({ msg: 'User not found' })
        }
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.loginLine = async (req, res) => {
  try {
      
      const { userId, displayName, pictureUrl } = req.body;

      var data = {
        username: userId,
        displayName: displayName,
        picture: pictureUrl,
      }

      var user = await User.findOneAndUpdate({ username: userId }, { new: true });
      console.log(user);
      if(user)
      {
        console.log('User Updated');
      }else{
        user = new User(data);
        await user.save();
      }

      var payload = {
        user
      };

      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, payload });
      });
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.loginFacebook = async (req, res) => {
  try {
      
      const { userID, name, email } = req.body;

      var data = {
        username: userID,
        displayName: name,
        email: email,
      };

      var user = await User.findOneAndUpdate(
        { username: userID },
        { new: true }
      );
      console.log(user);
      if(user)
      {
        console.log('User Updated');
      }else{
        user = new User(data);
        await user.save();
      }

      var payload = {
        user
      };

      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, payload });
      });
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};