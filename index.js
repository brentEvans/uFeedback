const express = require('express');
const mongoose = require('mongoose'); 
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User'); // must require the user model class BEFORE requiring passport file
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();


app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,        // 30 days in milliseconds
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); 
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production' ) {
    // Express will serve up production assets like our main.js file, or main.css file
    app.use(express.static('client/build'))

    // Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);



// app.get('/', (req, res) => {
//     res.send({ hello: 'guy' });
// });


// app.use wires up MIDDLEWARE
    //small functions used to modify incoming requests before they're sent to route handlers
        // by wiring up this middleware, we don't have to put the same logic inside each route handler every time
        // however, middleware can be wired up so that it only affects SOME route handlers
        
