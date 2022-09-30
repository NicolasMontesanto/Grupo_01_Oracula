const express = require('express');
const routes = express.Router();
const main = require("./main.routes");
const products = require('./products.routes');
const user = require('./users.routes');
const api = require ('./api.routes')

//rutas

//rutas main
routes.use("/", main);

//rutas usuarios
routes.use("/user", user);

//rutas productos
routes.use("/product", products);

//rutas de apis
routes.use("/api", api)


module.exports = routes;


