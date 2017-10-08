const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const http = require('http');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

// Tell Express to use cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // set to 30 days
		keys: [keys.cookieKey] // key to encrypt cookie, can use multiple keys in array for extra security
	})
);
// Tell Passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// Setup Models
require('./models/User');

// Setup Passport
require('./services/passport');

// Routes Setup
require('./routes/authRoutes')(app); // module exports function - can just pass in expected arg with ()

// Server Setup

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port:', port);
