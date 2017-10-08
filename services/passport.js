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
			// Check to see if user already present in mongoDB
			User.findOne({
				googleId: profile.id
			}).then((existingUser) => {
				if(existingUser) {
					// User present in mongoDB
					console.log("User already present");
				} else {
					// User not present in mongoDB
					// Create new user with returned google id and save to mongoDB
					new User({
						googleId: profile.id
					}).save();
				}
			});
		}
	)
);