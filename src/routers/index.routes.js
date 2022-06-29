const express = require('express');
const routes = express.Router();
const main = require("./main.routes");
const products = require('./products.routes');
const user = require('./users.routes');

//rutas

//rutas main
routes.use("/", main);

//rutas usuarios
routes.use("/user", user);

//rutas productos
routes.use("/product", products);


module.exports = routes;


