const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usersController');
const path = require('path');
upload = require('../middleWares/multerUsers');

//rutas de páginas de usuarios
routes.get("/login", userController.login);
routes.get("/signup", userController.signup);
routes.post("/signup", upload.single('profile-picture'), userController.store);
routes.get("/:id/edit", userController.edit);
routes.put("/:id/edit", upload.single('profile-picture'), userController.update);
routes.delete("/:id/delete", userController.delete);

module.exports = routes;