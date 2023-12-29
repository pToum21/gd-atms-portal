const { User, Ticket, Comment } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');

// homepage route
router.get('/', async (req, res) => {
    try {
        // Fetch all tickets with user details
        const ticketData = await Ticket.findAll({
            include: User,
            order: [['date_created', 'DESC']]
        });

        // Map ticket data to plain JavaScript objects
        const tickets = ticketData.map((ticketPost) => ticketPost.get({ plain: true }));

        // Map over each ticket and add the Cloudinary image URL
        const ticketsWithImages = await Promise.all(
            tickets.map(async (ticket) => {
                // Check if the ticket has an image
                if (ticket.image_url) {
                    // No need to generate Cloudinary URL here, use the stored URL
                    return { ...ticket, cloudinaryImage: ticket.image_url };
                } else {
                    // No image, return the original ticket object
                    return ticket;
                }
            })
        );

        // Render the home view with tickets and user login status
        res.render('home', {
            tickets: ticketsWithImages,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
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

// get route to show ticket by id
// include comments model
router.get('/ticket/:id', async (req, res) => {
    try {
        const userTicketData = await Ticket.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: User,
                },
                {
                    model: User
                }
            ]
        })

        const userTicket = userTicketData.get({ plain: true })

        res.render('ticket', {
            ...userTicket,
            logged_in: req.session.log
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// create a route that shows all of the logged in users previous tickets
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


module.exports = router;
