const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usersController');
const path = require('path');
upload = require('../middleWares/multerUsers');

const { body } = require('express-validator');


const validations = [
    body('nombre').notEmpty().withMessage('Por favor completá con tu nombre'),
    body('apellido').notEmpty().withMessage('Es necesario que completes tu apellido'),
    body('email')
        .notEmpty().withMessage('Por favor completá tu correo').bail()
        .isEmail().withMessage('¡El formato del correo no es válido! Intentalo de nuevo'),
    body('password').notEmpty().withMessage('No olvides tu contraseña'),
    body('passwordRepetir')
        .notEmpty().withMessage('Por favor repetí la contraseña.').bail()
        .custom((value, { req }) => {
            let passOriginal = req.body.password;
            let nuevaPass = req.body.passwordRepetir;

            if (passOriginal != nuevaPass) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }),
        body('profilePicture').custom((value, {req})=>{
            let file = req.file;
            let extensionesPermitidas = ['.png',  '.jpg', '.jpeg', '.gif', '.svg', '.jfif'];
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


//rutas de páginas de usuarios
//login
routes.get("/login", userController.login);
//registro
routes.get("/signup", userController.signup);
routes.post("/signup", upload.single('profilePicture'), validations, userController.store);
//edicion
routes.get("/:id/edit", userController.edit);
routes.put("/:id/edit", upload.single('profilePicture'), userController.update);
//borrado
routes.delete("/:id/delete", userController.delete);

module.exports = routes;