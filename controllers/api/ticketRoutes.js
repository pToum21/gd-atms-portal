const router = require('express').Router();
const { Ticket } = require('../../models');
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

module.exports = router;
