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

// Update a post
router.put('/:id', async (req, res) => {
    try {
        // Get the post to update and make changes
        const postData = await Post.update({ 
            content: req.body.content,
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        
        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})