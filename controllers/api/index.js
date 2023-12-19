const router = require('express').Router();
const userRoutes = require('./userRoutes')
const ticketRoutes = require('./ticketRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/users', userRoutes);
router.use('/ticket', ticketRoutes);
router.use('/comment', commentRoutes);



module.exports = router;