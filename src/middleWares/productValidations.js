const { body } = require('express-validator');
const path = require('path');

const validationsCreateProduct = [
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

module.exports = validationsCreateProduct; 