const express = require('express');
const mongoose = require('mongoose'); // since I'm requiring ./models/user below, is this line redundant?
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user'); // must require the user model class BEFORE we require passport file
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,        // 30 days in milliseconds
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // passing app into the function exported in authRoutes.js and invoking

const PORT = process.env.PORT || 5000;
app.listen(PORT);



// app.get('/', (req, res) => {
//     res.send({ hello: 'guy' });
// });


// app.use wires up MIDDLEWARE
    //small functions used to modify incoming requests before they're sent to route handlers
        // by wiring up this middleware, we don't have to put the same logic inside each route handler every time
        // however, middleware can be wired up so that it only affects SOME route handlers
        
