const passport = require('passport'); // base passport

module.exports = app => {
	'use strict';
	// Google Login
	app.get(
		'/auth/google/',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	// Facebook Login
	app.get(
		'/auth/facebook/',
		passport.authenticate('facebook', {
			scope: ['publish_actions']
		})
	);

	app.get('/auth/facebook/callback', passport.authenticate('facebook'));

	// Log out of app
	app.get('/api/logout', (req, res) => {
		req.logout(); // passport logout function
		res.send(req.user);
	});

	// Display Current logged in user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
