//middleware que no permite entrar a ciertas vistas si no se está loggeadx
const loggedMiddleware = {
    
    noLogged: function (req, res, next) {

    if(!req.session.userLogged){
        
       return res.redirect('/user/login');
    }
    next();
}};
   
module.exports = loggedMiddleware;