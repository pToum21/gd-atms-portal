const router = require('express').Router();
const { Ticket } = require('../../models');
const withAuth = require('../../utils/auth');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// post route to allow a user to make a ticket
router.post('/', async (req, res) => {
    try {
        // Check if an image file was uploaded
        if (req.files && req.files.image) {
            const imageFile = req.files.image;

            // Upload image to Cloudinary
            const cloudinaryUpload = await cloudinary.uploader.upload(imageFile.tempFilePath);

            // Create ticket with the Cloudinary image URL
            const ticketData = await Ticket.create({
                ...req.body,
                user_id: req.session.user_id,
                image_url: cloudinaryUpload.secure_url // Save the secure URL provided by Cloudinary
            });

            res.status(200).json(ticketData);
        } else {
            // Handle case where no image was uploaded
            const ticketData = await Ticket.create({
                ...req.body,
                user_id: req.session.user_id
            });
            res.status(200).json(ticketData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

// create an update route for tickets
router.put('/:id', withAuth, async (req, res) => {
    try {
        const ticketData = await Ticket.update({
            ...req.body,
            date_updated: new Date(),
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!ticketData){
            res.status(404).json({ message: 'Cannot find the ticket you are looking for with this id' })
            return;
        }

        res.status(200).json(ticketData)
        
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

module.exports = router;
