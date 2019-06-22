// prod.js - production keys here (DO COMMIT THIS!!! Otherwise, Heroku can't require './prod' in our keys.js file)

// export an object where the values inside the object are being pulled from environment variables in the Heroku environment
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridKey: process.env.SEND_GRID_KEY
};



// convention: list out environment variables with all caps and underscores

