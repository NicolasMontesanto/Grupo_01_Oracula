const express = require('express');
const routes = express.Router();
const productController = require('../controllers/productsController');
const upload = require('../middleWares/multerMid');
const validations = require('../middleWares/productValidations');
//middleware para usuarixs logeadxs - que impide que usuarixs NO logueadxs entren a perfil y carrito 
const loggedMiddleware = require('../middleWares/loggedMiddleware');
const adminAuthMiddleware = require("../middleWares/adminAuthMiddleware");
const { Router } = require('express');

//rutas de páginas de productos
routes.get("/detail/:id", productController.detail);
//carrito
routes.get("/cart",loggedMiddleware.noLogged, productController.cart);
//agregar producto a carrito
routes.post('/cart/:id', loggedMiddleware.noLogged, productController.cartButton);
//eliminar productos del carrito
routes.post('/cart/delete/:id', loggedMiddleware.noLogged, productController.cartDelete);
//listar todos los productos
routes.get("/list", productController.list);
//Buscar producto
routes.get("/search", productController.search);
//crear el producto
routes.get("/create", adminAuthMiddleware.noLoggedAdmin, productController.create);
routes.post("/create",  upload.single('imagenes'), validations.validationsCreateProduct, productController.store);
//editar un producto
routes.get("/:id/edit",adminAuthMiddleware.noLoggedAdmin, productController.edit);
routes.put("/:id/edit", upload.single('imagenes'), validations.validationsEditProduct, productController.update);
//eliminar producto
routes.delete("/:id/delete", productController.delete);


module.exports = routes;