const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establish the associations

// User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.hasOne(User, {
    foreignKey: 'user_id'
});
Comment.hasOne(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Comment, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
Post.hasOne(Comment, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
})


module.exports = { User, Post, Comment }


// // User can have many comments
// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })
// // Comment belongs to user
// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// })
// // Post can have one comment
// Post.hasOne(Comment, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// })
// // Comment belongs to one post
// Comment.belongsTo(Post, {
//     foreignKey: 'post_id'
// })


// });
// // User can have many comments
// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })
// // Post belongs to one user
// Post.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// // Comment has one user
// Comment.hasOne(User, {
//     foreignKey: 'user_id'
// })
// // User belongs to comment
// User.belongsTo(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })

// // Comment has one post
// Comment.hasOne(Post, {
//     foreignKey: 'post_id'
// });
// // Post can have one comment
// Post.belongsTo(Comment, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// })
// // // Comment belongs to one post
// // Comment.belongsTo(Post, {
// //     foreignKey: 'post_id'
// // })