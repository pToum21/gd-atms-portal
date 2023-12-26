const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const models = require('./models')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// const sessionMiddleware = require('./utils/sessionMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// this is the length of the cookie amking it last one week
const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // cookie expires after 1 week
        maxAge: oneWeekInMilliseconds,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});