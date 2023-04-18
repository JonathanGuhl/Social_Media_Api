const { Thoughts, User } = require('../models');
const { rawListeners } = require('../models/thoughts');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.id });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thoughts.create(red.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id} },
                { new: true }
            );

            if(!user) {
                return res.status(404).json({
                    message: 'Thought created but there is no user with that ID',
                })
            }
            res.json('🎊 Your thought has been created! 🎊')
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { thoughtText: req.body.thoughtText } },
                { runValidators: true, new: true }
            );
            if(!updatedThought)
            res.status(404).json({ message: 'There is no thought with that ID'});

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try { 
            const deletedThought = await Thoughts.findOneAndRemove({ _id: req.params.id });

            if(!deletedThought) {
                return res.status(404).json({ message: 'No thought with that ID!'});
            }

            const user = await User.findOneAndUpdate(
                { username: deletedThought.username },
                { $pull: { thoughts: deletedThought.id } },
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }

            res.json({ message: 'Thought has been deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
}