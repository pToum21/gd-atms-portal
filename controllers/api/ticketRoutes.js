const router = require('express').Router();
const { Ticket } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const ticketData = await Ticket.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(ticketData)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
})

module.exports = router