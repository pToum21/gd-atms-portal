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

    
} catch (error) {
    
}
})