// prod.js - production keys here (DO COMMIT THIS!!! Otherwise, Heroku can't require './prod' in our keys.js file)

// export an object where the values inside the object are being pulled from environment variables in the Heroku environment
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
};

// prod user password: nTusNoIufHefCoMh
// mongodb+srv://brent:nTusNoIufHefCoMh@cluster0-ztv18.mongodb.net/test?retryWrites=true&w=majority


// prod client id: 953447663110-hvg8p4lqj3fmi460jhtlnqs9kj38m4q1.apps.googleusercontent.com
// prod client secret: jvw5NIq4DMNwQIWCDSgqwgfX


// convention: list out environment variables with all caps and underscores

