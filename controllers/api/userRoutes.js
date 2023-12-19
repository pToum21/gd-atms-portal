const router = require('express').Router();
const { User } = require('../../models');

// Sign up new user
router.post('/', async (req, res) => {
    try {
        // Modify the user creation process to include the 'role' field
        const newUser = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'customer', // Set a default role if not provided
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (error) {
        res.status(500).json({ message: 'Could not create user' });
    }
});

// Log in user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are logged in' });
        });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// Logout
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
