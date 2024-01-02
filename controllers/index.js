const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const profileRoutes = require('./profileRoutes')

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes)


module.exports = router;