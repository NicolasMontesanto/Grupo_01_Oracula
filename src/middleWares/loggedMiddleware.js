const loggedMiddleware = {
    
    noLogged: function (req, res, next) {

    if(!req.session.userLogged){
        
       return res.redirect('/user/login');
    }
    next();
}};
   
module.exports = loggedMiddleware; 