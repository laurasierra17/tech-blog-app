const router = require('express').Router();
const { User } = require('../../models');

// When user submits form to sign up, we store their data in the database and in the session to mark them as logged in
router.post('/', async (req, res) => {
    try {
        // We're creating a new User row with the information from the form (username and password)
        const newUser = await User.create(req.body);

        // Save this user's information in the sessions to mark them as logged in
        req.session.save(() => {
            req.session.user_id = newUser.isSoftDeleted,
            req.session.logged_in = true;

            req.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
