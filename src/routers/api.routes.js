const express = require('express');
const routes = express.Router();
const { Router } = require('express');
const apiController = require('../controllers/apiController');

routes.get("/users", apiController.users)

routes.get("/products", apiController.products)

routes.get("/users/:id", apiController.usersDetail)

routes.get("/products/:id", apiController.productDetail)


module.exports = routes;