const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

module.exports = {
    checkSession: async (req, res, next) => {
        if (req.user) {
            let userRegister = req.user;
            userRegister.password = null;

            return res.status(200).json(userRegister);
        } else {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
    },

    registerPost: (req, res, next) => {
        const { name, email, password, image } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Completa todos los campos" });
        }
        console.log("request lleva esto en el body", req.body);

        passport.authenticate("register", (error, user) => {
           
            if (error) {
                return next(error);
            }
            req.logIn(user, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                }

                let userRegister = user;
                userRegister.password = null;

                return res.json(userRegister);
            });
        })(req, res, next);
    },

    loginPost: (req, res, next) => {
        passport.authenticate("login", (error, user) => {
            if (error) {
                return res.json({ message: error.message });
            }

            req.logIn(user, (error) => {
                if (error) {
                    return res.json({ message: error.message });
                }

                let userLogged = user;
                userLogged.password = null;

                return res.json(userLogged);
            });
        })(req, res, next);
    },
};
