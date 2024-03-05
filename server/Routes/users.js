const express = require('express')
const router = express.Router()

const {
    read,
    list,
    create,
    update,
    remove
} = require('../Controllers/user')

router.get('/user/:id', list)
router.put('/user/:id', update)
// router.get('/user/:id', read)

module.exports = router
