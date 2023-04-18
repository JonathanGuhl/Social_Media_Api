const { User, Thoughts } = require('../models');

module.exports = { 
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .select('-__v');

        if(!user) {
            return res.status(404).json({ message: 'No user with that ID!'});
        }

        res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });

        if(!user) {
            return res.status(404).json({ message: 'No user with that ID!'});
        }

        await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and their associated thoughts have been deleted'})
    } catch (err) {
        res.status(500).json(err)
    }
},
};