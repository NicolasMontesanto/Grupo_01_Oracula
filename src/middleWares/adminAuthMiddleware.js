//Middleware que no permite ver vistas si no se es admin
const adminAuthMiddleware = {
    noLoggedAdmin: function (req, res, next) {
        const userLogged = req.session.userLogged;
        if (!userLogged){
            return res.redirect('/');
        } else if (!userLogged.esAdmin==1){
            return res.redirect('/');
        }
        next();
    }
};

module.exports = adminAuthMiddleware; 