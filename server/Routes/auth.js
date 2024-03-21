const express = require('express')
const router = express.Router()

const { register, login, currentUser, loginLine } = require('../Controllers/auth')

const { auth, adminCheck } = require('../Middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/loginline', loginLine)
router.post('/currentUser', auth, currentUser)
router.post('/currentAdmin', auth, adminCheck, currentUser)

module.exports = router