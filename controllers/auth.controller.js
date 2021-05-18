const passport = require('passport');

module.exports = {
    registerGet: (req, res, next) => {
        return res.render('auth/register');
    },

    registerPost: (req, res, next) => {
        const done = (error, user) => {
            if (error) {
                return next(error);
            };
            /**
             * Si se produce un error autenticando, passport ejecuta esta función con done(new Error('...'), null)
             * Si no se produce ningún error, passport ejecuta con done(null, user)
             */
    
            req.logIn(user, (error) => {
                if(error) {
                    return next(error);
                }
    
                return res.redirect('/');
            });
        };
        
        passport.authenticate('registro', done)(req);  
    },

    registerArtistPost: (req, res, next) => {
        const done = (error, user) => {
            if (error) {
                return next(error);
            };
            /**
             * Si se produce un error autenticando, passport ejecuta esta función con done(new Error('...'), null)
             * Si no se produce ningún error, passport ejecuta con done(null, user)
             */
    
            req.logIn(user, (error) => {
                if(error) {
                    return next(error);
                }
    
                return res.redirect('/');
            });
        };
        
        passport.authenticate('registro-artista', done)(req);  
    },

    loginGet: (req, res, next) => {
        return res.render('auth/login');
    },

    loginPost: (req, res, next) => {
        passport.authenticate('acceso', (error, user) => {
            if(error) {
                return next(error);
            }
    
            req.logIn(user, (error) => {
                if(error) {
                    return next(error);
                }
    
                if(user.location) {
                    // es artista
                    return res.redirect('/');
                } else {
                    // es usuario
                    return res.redirect('/artist-page');
                }
            });
        })(req);
    },

    logoutPost: (req, res, next) => {
        if(req.user) {
            req.logout();
    
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
    
                return res.redirect('/');
            });
    
        } else {
            return res.status(200).json('No había ningún usuario logueado');
        }
    }
};