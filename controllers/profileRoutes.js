const { User, Ticket, Comment } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');

// create a route that shows all of the logged in users previous tickets
// maybe move this route out of html routes and put it into profileRoutes
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Ticket, include: [User] }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(err);
    }
})