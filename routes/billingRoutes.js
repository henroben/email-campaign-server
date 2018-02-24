const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post(
        '/api/stripe',
        requireLogin, // apply middleware to this route only
        async (req, res) => {

            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: `$5 charged to ${req.body.email} by Email Campaign Server`,
                source: req.body.id
            });

            req.user.credits += 5;
            const user = await req.user.save();

            res.send(user);
        }
    );
};