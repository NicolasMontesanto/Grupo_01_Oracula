const User = require('../models/User');

function recordarMiddleware(req, res, next) {

   let emailCookie = req.cookies.userEmail;
   let userFromCookie = User.findFirstByField('email', emailCookie);

   //console.log(userFromCookie); 

   if (userFromCookie){
      req.session.userLogged = userFromCookie;
   }
 
   next();

};

module.exports = recordarMiddleware;