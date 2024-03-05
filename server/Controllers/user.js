const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const uri =  
  "mongodb+srv://RI:RI@dentistbooking.y3xjl.mongodb.net/?retryWrites=true&w=majority&appName=DentistBooking";
const client = new MongoClient(uri);

exports.list = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("DentistBooking");
        const col = db.collection("users");
        const filter = { "_id": new mongoose.Types.ObjectId(req.params.id)}
        const data = await col.findOne(filter);
        res.status(200).json(data);
    } catch (err) {
        console.log(err)
    } finally {
        await client.close();
    }
}

exports.update = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("DentistBooking");
        const col = db.collection("users");
        const filter = { "_id": new mongoose.Types.ObjectId(req.params.id)}
        const updateDoc = {
            $set: {
                "name": req.body.name
            }
        }
        const result = await col.updateOne(filter, updateDoc);
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
    } finally {
        await client.close();
    }
}