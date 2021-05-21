const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');


const encryptionTurns = 10;

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
    
};
const registerStrategy = new LocalStrategy(
    
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },

    async (req, email, password, done) => {
        try{
            const existingUser = await User.findOne({ email: email });

            if(existingUser){
                const error = new Error('This user already exists')
                return done(error);
            }

            const isValidEmail = validateEmail(email);

            if(!isValidEmail){
                const error = new Error('This email is not valid')
                return done(error);
            }

            const isValidPassword = validatePass(password);

            if(!isValidPassword){
                const error = new Error('The password must contain 6 to 20 characters, an uppercase, a lowercase and a number');
                return done(error);
            }

            const hash = await bcrypt.hash(password, encryptionTurns);

            const newUser = new User({
               name: req.body.name,
               email: email,
               password: hash,
               address:[{
                   street: req.body.street,
                   postalCode: req.body.postalCode,
                   city: req.body.city,

               }],
            });   

            

            const savedUser = await newUser.save();

            return done(null, savedUser);

        }catch(error){
            return done(error);
        }
    }
);

module.exports = registerStrategy;