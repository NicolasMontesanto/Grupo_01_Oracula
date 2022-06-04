const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/usersController');

//rutas de páginas de usuarios
routes.get("/login", usersController.login)
routes.get("/signup", usersController.signup)

module.exports = routes;