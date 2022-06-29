const express = require('express');
const routes = express.Router();
const productController = require('../controllers/productsController');
const path = require('path');
const upload = require('../middleWares/multerMid');

//rutas de páginas de productos
routes.get("/detail/:id", productController.detail);
routes.get("/cart", productController.cart);
routes.get("/list", productController.list);
routes.get("/create", productController.create);
routes.post("/create", upload.single('imagenes'), productController.store);
routes.get("/:id/edit", productController.edit);
routes.put("/:id/edit", upload.single('imagenes'), productController.update);
routes.delete("/:id/delete", productController.delete);
module.exports = routes;