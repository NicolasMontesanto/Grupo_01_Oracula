const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usersController');
const path = require('path');
//middleware para visitantes - que impide que usuarixs logueadxs entren a login y registro 
const guestMiddleware = require('../middleWares/guestMiddelware');
//middleware para usuarixs logeadxs - que impide que usuarixs NO logueadxs entren a perfil y carrito 
// ! FALTA IMPLEMENTAR EN LA RUTA DE PERFIL  cuando esté lista  
const loggedMiddleware = require('../middleWares/loggedMiddleware');

const upload = require('../middleWares/multerUsers');
// validacion de productos 
const validations = require('../middleWares/usersValidations');

//rutas de páginas de usuarios
//login
routes.get("/login", guestMiddleware, userController.login);
routes.post("/login",  validations.validationsLogin, userController.processLogin);
//logout
routes.get("/logout", userController.logout);
//registro
routes.get("/signup", guestMiddleware, userController.signup);
routes.post("/signup", upload.single('profilePicture'), validations.validationsSignup, userController.store);
//edicion
routes.get("/:id/edit", userController.edit);
routes.put("/:id/edit", upload.single('profilePicture'), userController.update);
//borrado
routes.delete("/:id/delete", userController.delete);
//profile
routes.get("/profile", loggedMiddleware.noLogged, userController.profile);

module.exports = routes;