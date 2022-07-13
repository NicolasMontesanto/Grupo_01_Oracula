const express = require('express');
const routes = express.Router();
const productController = require('../controllers/productsController');
const path = require('path');
const upload = require('../middleWares/multerMid');
const { body } = require('express-validator');


const validations = [
    body('nombre').notEmpty().withMessage("Por favor completá el nombre del producto"),
    body('descripcion').notEmpty().withMessage("Necesitamos una descripción para poder cargar el producto"),
    body('categoria').notEmpty().withMessage("¡No te olvides de seleccionar una categoría!"),
    body('subcategoria').notEmpty().withMessage("Por favor seleccioná una también subcategoría"),
    body('precio').notEmpty().withMessage("¡No olvides el precio!"),
    body('imagenes').custom((value, {req})=>{
    let file = req.file;
    let extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.jfif'];
    let fileExtension = path.extname(file.originalname);
    if(!file){
        throw new Error('Seleccioná una imagen para tu producto');
    }else{   
        if(!extensionesPermitidas.includes(fileExtension.toLowerCase())){
            throw new Error (`Las extensiones de archivo permitidas son ${extensionesPermitidas.join(", ")}`)
        }
    }
        return true;
    })
]; 

//rutas de páginas de productos
routes.get("/detail/:id", productController.detail);
//carrito
routes.get("/cart", productController.cart);
//listar todos los productos
routes.get("/list", productController.list);
//crear el producto
routes.get("/create", productController.create);
routes.post("/create",  upload.single('imagenes'), validations, productController.store);
//editar un producto
routes.get("/:id/edit", productController.edit);
routes.put("/:id/edit", upload.single('imagenes'), productController.update);
//eliminar producto
routes.delete("/:id/delete", productController.delete);


module.exports = routes;