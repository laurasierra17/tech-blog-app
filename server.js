// Dependencies
const express = require('express');
const path = require('path');
const routes = require('./controllers');
// Handlebars
const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');
// Sequelize
const sequelize = require('./config/connection');
// For authentication
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

// Set up session
const sess = {
    secret: 'Secrety secret',
    // Set up cookies to expire when the user is idle for a set amount of time
    cookie: {},
    resave: false,
    saveUnintialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// Inform Express.js on which template engine to use
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening..."));
})