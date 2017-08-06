const passport = require('passport'); // base passport

module.exports = app => {
	'use strict';
	app.get(
		'/auth/google/',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));
};
