const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Always confirm the user is logged in
router.use(withAuth);

// Save the user's newly created post
router.post('/', async (req, res) => {
    try {
        // Add the new post to the database
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});