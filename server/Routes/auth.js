const express = require('express')
const router = express.Router()

const { register, login, currentUser } = require('../Controllers/auth')

const { auth, adminCheck } = require('../Middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/currentUser', auth, currentUser)
router.post('/currentAdmin', auth, adminCheck, currentUser)

module.exports = router