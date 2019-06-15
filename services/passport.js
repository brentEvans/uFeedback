const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { // user argument comes from existingUser returned by passport.use()
    done(null, user.id) // user.id is NOT the profile.id (googleId) - rather, a new id generated by Mongo (internal id)
});

passport.deserializeUser((id, done) => {  // first arg is id from cookie
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
                // we already have a record with the given profile ID
                // first argument to done() is err, second argument is the user
                console.log("*"*30);
                console.log('access token', accessToken);
                console.log("*"*30);
                console.log('refresh token', refreshToken);
                console.log("*"*30);
                console.log('profile', profile);


                done(null, existingUser);
            } else {
                // we don't have a user record with this ID, make a new record
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
    })
);









// passport gives Express the idea of how to handle authentication
    // passport.use() tells passport there's a new strategy available
// GoogleStrategy instructs passport on exactly how to authenticate our users with Google OAuth
    // new GoogleStrategy() creates new instance 
        // passing in config options
        // has an internal identifier called 'google' -- pass this into passport.authenticate() (**** inside authRoutes.js !!!)
            // scope tells passport the info that we want access to 


// serializeUser is automatically called by passport using the user model that we just fetched
    // use this user model to generate identifying piece of user info
        // pass this identifying piece of info to passport, then passport stuffs this token into the user's browser

// deserializeUser takes the cookie attached to the user's request, takes this info and turns it into a user model that uniquely identifies this user

