const router = require('express').Router();

const { 
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

// api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
// api/thoughts/:id/reactions
router.route('/:id/reactions').post(createReaction);
//api/thoughts/:id/reactions/:id
router.route('/:id/reactions/:reactionId').delete(deleteReaction);


module.exports = router; 