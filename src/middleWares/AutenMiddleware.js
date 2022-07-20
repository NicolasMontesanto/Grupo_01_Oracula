function recordarMiddleware (req, res, next ) {

    if (req.cookie.recordarPassword != undefined && req.session.userLogged == undefined) {
        let userToLogin = User.findFirstByField('email', req.body.email);
      
        req.session.userLogged = userToLoginEmail;
    }

    next();

}

module.exports = recordarMiddleware;