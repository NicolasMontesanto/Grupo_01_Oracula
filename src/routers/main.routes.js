const express = require('express');
const routes = express.Router();
const mainController = require('../controllers/mainController');

//ruta de main
routes.get("/", mainController.home);
//ruta de categoria 
routes.get("/category/:id", mainController.category)

routes.get("/testconexion", mainController.estaConectado.funciona);


module.exports = routes;