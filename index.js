const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const keys = require('./config/keys');

mongoose.connect(
	keys.mongoURI
);

const app = express();

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
