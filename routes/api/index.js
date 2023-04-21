const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes.js');

//api/users
router.use('/users', userRoutes );
//api/thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;