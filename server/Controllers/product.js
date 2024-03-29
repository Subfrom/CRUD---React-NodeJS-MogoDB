const { payment } = require('../Functions/Payment');
const Product = require('../Models/Product')
const fs = require('fs')


exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listby = async (req, res) => {
    try {
        // code
        const { limit, sort, order } = req.body

        const producted = await Product.find({})
        .limit(limit)
        .sort([[sort, order]])
        .exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.create = async (req, res) => {
    try {
        // code
        var data = req.body

        if (req.file)
        {
            data.image = req.file.filename
        }
        const producted = await Product(data).save()
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async (req, res) => {
    try {
        // code
        const id = req.params.id
        var newData = req.body
        if (typeof req.file !== 'undefined')
        {
            newData.image = req.file.filename
            await fs.unlink('./uploads/' + newData.oldImage, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }
        const updated = await Product
            .findOneAndUpdate({ _id: id }, newData, { new: true })
            .exec()
        res.send(updated)

    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id:id}).exec()
        
        if(removed?.image)
        {
            await fs.unlink('./uploads/' + removed.image, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }

        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.checkout = async (req, res) => {
    try{
        const { description, amount } = req.body

        const test = await payment(description, amount);

        return res.json(test)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
