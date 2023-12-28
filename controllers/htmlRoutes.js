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
    } catch (error) {
        console.log(error)
        res.status(400).json(err)
    }
})