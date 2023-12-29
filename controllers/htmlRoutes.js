const { User, Ticket, Comment } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');

// homepage route
router.get('/', async (req, res) => {
    try {
        const ticketData = await Ticket.findAll({
            include: User,
            order: [['date_created', 'DESC']]
        })

        const ticket = ticketData.map((ticketPost) => ticketPost.get({ plain: true }))

        res.render('home', {
            ticket,
            llogged_in: req.session.logged_in
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(err)
    }
});

// If the user is already logged in, redirect the request to another route
// might delete this route later if not needed 
router.get('/login', (req, res) => {
    
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
    }

    res.render('login');
});

