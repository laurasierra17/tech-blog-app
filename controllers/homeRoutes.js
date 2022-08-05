const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
        });

        // Serialize data so the template can read it
        const posts = postData.map(post => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get the post the user selected from Home to display and respective comments
router.get('/post/:id', async (req, res) => {
    try {
        // Get post info
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['content', 'date_created', 'user_id']
                }
            ]
        });
        const post = postData.get({ plain: true });

        // Get name of the user id linked to the Comment
        if (post.comment) {
            const commentUserData = await User.findByPk(post.comment.user_id);
            const commentUser = commentUserData.get({ plain: true });
    
            res.render('post', {
                ...post,
                commentUser: commentUser.username,
                logged_in: req.session.logged_in
              });
        } else {
            res.render('post', {
                ...post,
                logged_in: req.session.logged_in
              });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Runs when the logged in user wants to leave a comment in a post
router.post('/post/:id', withAuth, async (req, res) => {
    try {
        // Create a Comment row
        const commentData = await Comment.create({
            content: req.body.content,
            post_id: parseInt(req.params.id),
            user_id: req.session.user_id
        })

        const comment = commentData.get({ plain: true });

        res.status(200).json(comment)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to the Dashboard page if the user isn't logged in
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });

        const user = userData.get({ plain: true });

        // Sending over our user's posts to the frontend
        res.render('dashboard', {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;