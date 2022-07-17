function guestMiddleware(req, res, next) {

 if(req.session.userLogged){
    // ! ESTO DEBERIA REDIRIGIR A user/PROFILE cuando esté la vista hecha 
    return res.redirect('/');
 }
 next();

};

module.exports = guestMiddleware; 