const passport = require("passport");
const User = require('../models/User.model');


module.exports = {
  checkSession: async (req, res, next) => {
      if(req.user) {
        let userRegister = req.user;
        userRegister.password = null;

        return res.status(200).json(userRegister);
      } else {
        return res.status(401).json({message: 'Usuario no encontrado'});
      }
  },

  loginPost: (req, res, next) => {
    passport.authenticate("login", (error, user) => {
      if (error) {
        return res.json({message: error.message});
      }
      
      req.logIn(user, (error) => {
        if (error) {
          return res.json({message: error.message});
        };

        let userLogged = user;
        userLogged.password = null;

        return res.json(userLogged);
      });
    })(req, res, next);
  },

};
