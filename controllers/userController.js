const { User, Thoughts } = require('../models');

module.exports = { 
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate([ 'thoughts', 'friends'])
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .populate([ 'thoughts', 'friends'])
            // .select('-__v');

        if(!user) {
            return res.status(404).json({ message: 'No user with that ID!'});
        }

        res.json(user);
        } catch (err) {
            console.log(err)
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
    async updateUser(req, res) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
            ).exec()
          
          if(!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID!'});
          }
    
          res.json(updatedUser);
        } catch (err) {
            console.log(err)
          res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
          const addedFriend = User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true })
            .exec();

        if(!addedFriend) {
            return res.status(404).json({ message: 'No user with that ID!'})
        }
            res.json(addedFriend)
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
          const deletedFriend = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .populate('friends')

            if(!deletedFriend) {
                return res.status(404).json({ message: 'No user with that ID!'})
            }

            res.json(deletedFriend)
        } catch (err) { 
            console.log(err)
            res.status(500).json(err);
        }
    },
};