const express = require('express');
const routes = express.Router();
const productController = require('../controllers/productsController');
const path = require('path');
const upload = require('../middleWares/multerMid');
const validations = require('../middleWares/productValidations');
//middleware para usuarixs logeadxs - que impide que usuarixs NO logueadxs entren a perfil y carrito 
const loggedMiddleware = require('../middleWares/loggedMiddleware');

//rutas de páginas de productos
routes.get("/detail/:id", productController.detail);
//carrito
routes.get("/cart",loggedMiddleware.noLogged, productController.cart);
//listar todos los productos
routes.get("/list", productController.list);
//crear el producto
routes.get("/create", productController.create);
routes.post("/create",  upload.single('imagenes'), validations.validationsCreateProduct, productController.store);
//editar un producto
routes.get("/:id/edit", productController.edit);
routes.put("/:id/edit", upload.single('imagenes'), validations.validationsEditProduct, productController.update);
//eliminar producto
routes.delete("/:id/delete", productController.delete);


module.exports = routes;