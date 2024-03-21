const User = require("../Models/User");

exports.list = async (req, res) => {
    try {
        const users = await User.find({}).select("-password").exec();

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.updateRole = async (req, res) => {
    try{
        const { id, role } = req.body.data;

        const user = await User.findOneAndUpdate({_id: id}, { role: role }, { new: true }).select('-password').exec();
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};