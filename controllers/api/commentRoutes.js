const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

module.exports = router;