const express = require('express');
const routes = express.Router();
const mainController = require('../controllers/mainController');

//ruta de main
routes.get("/", mainController.home);

module.exports = routes;