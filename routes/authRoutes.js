const passport = require('passport'); // base passport

module.exports = app => {

	// Google Login
	app.get(
		'/auth/google/',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// Facebook Login
	app.get(
		'/auth/facebook/',
		passport.authenticate('facebook', {
			scope: ['publish_actions']
		})
	);

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// Log out of app
	app.get(
		'/api/logout',
		(req, res) => {
			req.logout(); // passport logout function
			res.redirect('/');
		}
	);

	// Display Current logged in user
	app.get('/api/current_user', (req, res) => {
		// res.send(req.session); // Contains the data extracted from the cookie
		res.send(req.user); // Return the user object
	});
};
