const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:1234@cluster.jmlwbrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')
        console.log('DB Connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB