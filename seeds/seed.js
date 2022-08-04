const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Populate the database's User table with our userData json file
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    // Populate the database's Post table with data in postData.json and initializing user_id
    // to a random user's id from userData.json
    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();