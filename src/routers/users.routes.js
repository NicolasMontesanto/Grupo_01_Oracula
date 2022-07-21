const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usersController');
const path = require('path');
//middleware para visitantes - que impide que usuarixs logueadxs entren a login y registro 
const guestMiddleware = require('../middleWares/guestMiddelware');
//middleware para usuarixs logeadxs - que impide que usuarixs NO logueadxs entren a perfil y carrito 

const loggedMiddleware = require('../middleWares/loggedMiddleware');
const adminAuthMiddleware = require("../middleWares/adminAuthMiddleware");

const recordarMiddleware = require("../middleWares/recordarMiddleware");

const upload = require('../middleWares/multerUsers');
// validacion de usuarios 
const validations = require('../middleWares/usersValidations');

//rutas de páginas de usuarios
//login
routes.get("/login", guestMiddleware, recordarMiddleware, userController.login);
routes.post("/login",  validations.validationsLogin, userController.processLogin);
//logout
routes.get("/logout", userController.logout);
//registro
routes.get("/signup", guestMiddleware, recordarMiddleware, userController.signup);
routes.post("/signup", upload.single('profilePicture'), validations.validationsSignup, userController.store);
//registro admin
routes.get("/signup/admin", adminAuthMiddleware.noLoggedAdmin, userController.signup);
//edicion
routes.get("/:id/edit", userController.edit);
routes.put("/:id/edit", upload.single('profilePicture'), validations.validationsUserEdit, userController.update); 
//borrado
routes.delete("/:id/delete", userController.delete);
//profile
routes.get("/profile", loggedMiddleware.noLogged, userController.profile);

module.exports = routes;