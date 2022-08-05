const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establish the associations

// User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// User can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
// Post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
// Comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
// Post can have one comment
Post.hasOne(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
// Comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})


module.exports = { User, Post, Comment }