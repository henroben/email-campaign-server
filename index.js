const express = require('express');
const http = require('http');
const passport = require('passport'); // base passport
const googleStrategy = require('passport-google-oauth20').Strategy; // strategy for google
const keys = require('./config/keys');

const app = express();

// Setup Passport
passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
        (accessToken, refreshToken, profile, done) => {
			'use strict';
			console.log('access token: ', accessToken);
			console.log('refresh token: ', refreshToken);
			console.log('profile: ', profile.displayName);
			console.log('done: ', done);
		}
	)
);

// Routes Setup

app.get(
	'/auth/google/',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));

// Server Setup

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port:', port);
