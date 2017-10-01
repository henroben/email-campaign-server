const passport = require('passport'); // base passport
const googleStrategy = require('passport-google-oauth20').Strategy; // strategy for google
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			'use strict';
			// Create new user with returned google id and save to mongoDB
			new User({
				googleId: profile.id
			}).save();
		}
	)
);
