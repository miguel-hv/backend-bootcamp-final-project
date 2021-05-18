const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // Usuario autenticado, continuamos
        return next();
    } else {
        // El usuario no está autenticado.
        return res.redirect('/auth/login');
    }
};

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            // Permito el paso
            return next();
        } else {
            // Deniego el paso
            return res.redirect('/');
        }
    } else {
        return res.redirect('/auth/login');
    }
};

module.exports = {
    isAuthenticated,
    isAdmin,
}