const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const http = require('http');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

// Tell Express to parse the body of post requests
app.use(bodyParser.json());
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
require('./models/Survey');

// Setup Passport
require('./services/passport');

// Routes Setup
require('./routes/billingRoutes')(app); // module exports function - can just pass in expected arg with ()
require('./routes/authRoutes')(app); // module exports function - can just pass in expected arg with ()
require('./routes/surveyRoutes')(app); // module exports function - can just pass in expected arg with ()

// Production Routes Setup
if(process.env.NODE_ENV === 'production') {
	// Serve static assets
	app.use(express.static('client/build'));
	// Return index.html for undefined routes
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port:', port);
