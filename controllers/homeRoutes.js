const router = require('express').Router();
const { User, Post } = require('../models');
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
        // res.render('homepage', {
        //     projects,
        //     logged_in: req.session.logged_in
        // });

        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get the post the user selected from Home to display
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const post = postData.get({ plain: true });

        // res.render('project', {
        //     ...project,
        //     logged_in: req.session.logged_in
        //   });

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to the Dashboard page if the user isn't logged in
// router.get('/dashboard', withAuth, async (req, res) => {
//     try {
//         // Find the logged in user based on the session ID
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Post }]
//         });

//         const user = userData.get({ plain: true });

//         // Sending over our user's posts to the frontend
//         // res.render('dashboard', {
//         //     ...user,
//         //     logged_in: true
//         // });

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// If the user is already logged in, redirect the request to another route
// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/dashboard');
//         return;
//     }

//     res.render('login');
// })

module.exports = router;