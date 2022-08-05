const router = require('express').Router();
const { User } = require('../../models');

// When user submits form to sign up, we store their data in the database and in the session to mark them as logged in
router.post('/', async (req, res) => {
    try {
        // We're creating a new User row with the information from the form (username and password)
        const newUser = await User.create(req.body);
        
        // Save this user's information in the sessions to mark them as logged in
        req.session.save(() => {
            req.session.user_id = newUser.id,
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handles user's login = inputs from the login form
router.post('/login', async (req, res) => {
    try {
        // Verify user exists in the databse
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        // User is not in the database
        if (!userData) {
            res.status(400).json({ message: "User doesn't exist" });
            return;
        }
    
        // Verify the password is correct
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password, please try again" });
        }
    
        // Save session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
    
            res.json({ user: userData, message: "You are now logged in!" });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout functionality
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => res.status(204).end());
    } else {
        res.status(400).end();
    }
});

module.exports = router;