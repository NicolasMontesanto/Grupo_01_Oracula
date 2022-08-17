//Middleware que verifica si existe un user registradx, si es admin, etc.
function userCredentialsMiddleware(req, res, next) {
    const userLogged = req.session.userLogged
    if (userLogged) {
        res.locals.loggedIn = true;
        res.locals.userLogged = userLogged;
    }
    if (userLogged && userLogged.esAdmin == 1) {
        res.locals.isAdmin = true;
    }

next();
}
module.exports = userCredentialsMiddleware;