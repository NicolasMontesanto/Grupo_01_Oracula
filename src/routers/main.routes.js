const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const mainController = require('../controllers/mainController');

//ruta de main
routes.get("/", mainController.home);
//ruta de categoria 
Router.get("/category/:categoria", mainController.category)
module.exports = routes;