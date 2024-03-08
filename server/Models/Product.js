const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    detail: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String,
        // no image free
        default: 'noimage.png'
    }
}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)