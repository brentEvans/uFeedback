const passport = require('passport');


module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'] 
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google', { 
        // successRedirect: '/',
        // successFlash: 'Welcome!',
        // failureRedirect: '/auth/google',
        // failureFlash: 'Invalid username or password!'
    }));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user); // sending back undefined object as proof that user is no longer signed in
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};




// MongoNetworkError is almost always caused by not whitelisting your IP address. If you are working from multiple networks you might just go ahead and whitelist all: 0.0.0.0/0

// logout() method is attached to request object automatically by passport
    // takes the cookie contained in our user.id and kills it
        // doesn't "clear" the cookie - just unsets the user property from it

            // logged-in express:sess cookie = eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWQwM2Q1OTZjZjcyZmI0ZTM0MmUwNDY5In19
            // logged-out express:sess cookie = eyJwYXNzcG9ydCI6e319, shorter!


