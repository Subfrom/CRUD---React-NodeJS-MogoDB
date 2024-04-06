const express = require('express')
const router = express.Router()

const { backendPayment } = require('../Functions/Payment')

router.post('/callbackpaymentback', backendPayment)

module.exports = router;