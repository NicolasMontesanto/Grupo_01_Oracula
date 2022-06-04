const express = require('express');
const routes = express.Router();
const productController = require('../controllers/productsController');

//rutas de páginas de productos
routes.get("/product", productController.product);
routes.get("/cart", productController.cart);

module.exports = routes;