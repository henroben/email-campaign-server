const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // Use this way to get schema, otherwise will cause error with testing frameworks

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		}); // get all surveys created by user, exclude recipients sub doc
		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		// Route to handle the redirect from clicking email link
		res.send('Thank you for your feedback!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');
		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname); // test url against path, if matches, extract variables
				if (match) {
					// if match !== null, return vars and email.
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: {
								email: email,
								responded: false
							}
						}
					},
					{
						$inc: {
							[choice]: 1
						},
						$set: {
							'recipients.$.responded': true
						}, // $ === $elemMatch from previous querry
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		res.send({}); // respond to sendGrid, otherwise it'll keep trying to send events
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		try {
			// Send Mailer to sendgrid
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();

			// Save the survey
			await survey.save();

			// Subtract credit from user's total & save new total
			req.user.credits -= 1;
			const user = await req.user.save();

			// Return the updated user model
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
