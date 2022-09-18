const express = require('express');
const routes = express.Router();
const { Router } = require('express');
const apiController = require('../controllers/apiController');

routes.get("/users", apiController.users)

module.exports = routes;