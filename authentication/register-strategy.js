const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Esta función la hemos sacado de internet buscando: js email validate
 * Lo que hace es recibir un email como string y la función re.test devuelve true
 * si el email es válido y devuelve false si no lo es.
 */
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
}

const registerStrategy = new LocalStrategy(
    {
        usernameField: 'email', // lo coge de req.body.email
        passwordField: 'password', // lo coge de req.body.password
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            /**
             * 1. Comprobar que el usuario no exista previamente
             * 2. Encriptar la contraseña para guardar encriptada.
             * 3. Crear la instancia del modelo User con los datos del usuario
             * 4. user.save() y guardar el usuario en la base de datos.
             */
            
            const existingUser = await User.findOne({ email: email });

            if(existingUser) {
                // No registrar al usuario
                const error = new Error('The user is already register');
                return done(error);
            }

            /**
             * Creamos una constante que será true si es email válido y false en caso de no serlo.
             * Si no es válido, creamos un error y terminamos la petición.
             */
            const isValidEmail = validateEmail(email);

            if(!isValidEmail) {
                const error = new Error('Email inválido, no me hagas trampas!!');
                return done(error);
            }

            const isValidPassword = validatePass(password);

            if(!isValidPassword) {
                const error = new Error('La contraseña tiene que contener de 6 a 20 carácteres, una mayúscula, una minúscula y un número');
                return done(error);
            }

            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                username: req.body.username,
                email: email,
                password: hash,
                role: 'user',
            });

            const savedUser = await newUser.save();

            return done(null, savedUser);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = registerStrategy;