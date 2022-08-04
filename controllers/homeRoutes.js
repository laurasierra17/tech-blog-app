const router = require('express').Router();
const { User, Post }= require('../models');

// Gets all posts and JOIN with user data. This will be used on the frontend to display all posts in the Home
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        // Serialize data so the template can read it
        const posts = postData.map(post => post.get({ plain: true }));

        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;