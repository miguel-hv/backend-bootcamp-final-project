const passport = require('passport');
const User = require('../models/User.model');
const loginStrategy = require('./login-strategy');

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error);
    }
});

passport.use('login', loginStrategy);
