const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    picture: {
        type: String,
    },
    displayName: {
        type: String,
    },
    ip: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.models.users || mongoose.model('users', userSchema)