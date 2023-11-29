const express = require('express');
const exphbs = require(`express-handlebars`);
const http = require('http'); // Import http module for creating HTTP server
const { Server } = require('socket.io'); // Import Server class from socket.io
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const setupSocket = require('./controllers/socket'); // Import the Socket.IO setup


const allRoutes = require('./controllers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Session configuration
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 // Uncomment if you are serving static files
 app.use(express.static('public'));

// Uncomment and configure if you plan to use Handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', allRoutes);

// Creating HTTP server from Express app
const server = http.createServer(app); // Create HTTP server

// Attach Socket.IO to HTTP server
const io = new Server(server);

// Init Socket.IO logic
// Pass the io instance to the setup function
setupSocket(io);

// Listen on HTTP server, NOT THE EXORESS APP
server.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});

// Sync Sequelize models
sequelize.sync({ force: false });