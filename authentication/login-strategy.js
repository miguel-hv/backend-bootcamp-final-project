const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });
            const existingArtist = await Artist.findOne({ email });

            if (!existingUser && !existingArtist) {
                const error = new Error("User doesn't exists");
                error.status = 401;
                return done(error);
            }

            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if(!isValidPassword) {
                const error = new Error('Password is invalid');
                return done(error);
            }
 
            return done(null, existingUser);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;