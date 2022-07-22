const adminAuthMiddleware = {
    noLoggedAdmin: function (req, res, next) {
        const userLogged = req.session.userLogged;
        if (!userLogged){
            return res.redirect('/');
        } else if (!userLogged.isAdmin){
            return res.redirect('/');
        }
        next();
    }
};

module.exports = adminAuthMiddleware; 