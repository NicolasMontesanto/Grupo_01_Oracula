const db = require('../database/models');

function recordarMiddleware(req, res, next) {

   let emailCookie = req.cookies.userEmail;
  if(emailCookie){db.User.findOne({
      where: {
         email: emailCookie
      }
   }).then( userFromCookie =>{
      if (userFromCookie) {
         req.session.userLogged = userFromCookie;
      }
      next();
    });
   }else{
      next();
   } 
};

module.exports = recordarMiddleware;