const passport = require('passport'); // base passport
const googleStrategy = require('passport-google-oauth20').Strategy; // strategy for google
const keys = require('../config/keys');

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