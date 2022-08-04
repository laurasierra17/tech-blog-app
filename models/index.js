const User = require('./User');
const Post = require('./Post');

// Establish the associations

// User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Post can only have one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post }