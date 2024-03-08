const express = require('express')
const router = express.Router()

const {
    read,
    list,
    create,
    update,
    remove
} = require('../Controllers/product')

const { auth } = require('../Middlewares/auth')
const { upload } = require('../Middlewares/upload')


//http://localhost:5000/api/product
router.get('/product', list)
router.get('/product/:id', read)
router.post('/product', upload, create)
router.put('/product/:id', upload, update)
router.delete('/product/:id', remove)




module.exports = router