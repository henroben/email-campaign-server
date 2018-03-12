const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // Use this way to get schema, otherwise will cause error with testing frameworks

module.exports = app => {
    app.get('/api/surveys/thankyou', (req, res) => {
        // Route to handle the redirect from clicking email link
        res.send('Thank you for your feedback!');
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