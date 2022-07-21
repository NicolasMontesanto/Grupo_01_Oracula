const User = require('../models/User');

function recordarMiddleware(req, res, next) {

   let emailCookie = req.cookies.userEmail;
   let userFromCookie = User.findFirstByField('email', emailCookie);

   console.log(userFromCookie); 
   
   if (userFromCookie){
      req.session.userLogged = userFromCookie;
   }

      if (req.session.userLogged) {
         // ! ESTO DEBERIA REDIRIGIR A user/PROFILE cuando esté la vista hecha 
         return res.redirect('/');
      }

   next();

};

module.exports = recordarMiddleware;