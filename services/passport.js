const passport = require('passport'); // base passport
const googleStrategy = require('passport-google-oauth20').Strategy; // strategy for google
const facebookStrategy = require('passport-facebook').Strategy; // strategy for facebook
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	'use strict';
	done(null, user.id); // user.id is the mongo record id, not the googleId
});

passport.deserializeUser((id, done) => {
	'use strict';
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			'use strict';
			// Check to see if user already present in mongoDB
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				// User present in mongoDB
				console.log('Google User already present');
				return done(null, existingUser);
			}
			// User not present in mongoDB
			// Create new user with returned google id and save to mongoDB
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);

passport.use(
	new facebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			'use strict';
			// Check to see if user already present in mongoDB
			const existingUser = await User.findOne({ facebookId: profile.id });

			if (existingUser) {
				// User present in mongoDB
				console.log('Facebook User already present');
				return done(null, existingUser);
			}
			// User not present in mongoDB
			// Create new user with returned facebook id and save to mongoDB
			const user = await new User({ facebookId: profile.id }).save();
			done(null, user);
		}
	)
);
