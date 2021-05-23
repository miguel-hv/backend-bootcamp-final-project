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
            // const validEmail = validate(email); 
            
            // if (!validEmail) {
            //     const error = new Error("Invalid Email");
            //     return done(error);
            //   }
      
            const existingUser = await User.findOne({ email });
            
            if (!existingUser) {
                const error = new Error("El nombre de usuario no existe.");
                error.status = 401;
                return done(error);
            }


            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if(!isValidPassword) {
                const error = new Error("Contraseña errónea.");
                return done(error);
            }
 
            return done(null, existingUser);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;
