const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usersController');
const path = require('path');
upload = require('../middleWares/multerUsers');
const validations = require("../middleWares/usersValidations");



//rutas de páginas de usuarios
//login
routes.get("/login", userController.login);
routes.post("/login",validations.validationsLogin, userController.processLogin);
//registro
routes.get("/signup", userController.signup);
routes.post("/signup", upload.single('profilePicture'), validations.validationsSignup, userController.store);
//edicion
routes.get("/:id/edit", userController.edit);
routes.put("/:id/edit", upload.single('profilePicture'), userController.update);
//borrado
routes.delete("/:id/delete", userController.delete);

module.exports = routes;