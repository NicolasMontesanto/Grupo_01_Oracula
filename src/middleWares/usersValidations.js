const { body } = require('express-validator');
const path = require('path');


const validationsSignup = [
    body('nombre').notEmpty().withMessage('Por favor completá con tu nombre'),
    body('apellido').notEmpty().withMessage('Es necesario que completes tu apellido'),
    body('email')
        .notEmpty().withMessage('Por favor completá tu correo').bail()
        .isEmail().withMessage('¡El formato del correo no es válido! Intentalo de nuevo'),
    body('profilePicture').custom((value, { req }) => {
        let file = req.file;
        let extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.jfif'];
        let fileExtension = path.extname(file.originalname);
        if (!file) {
            throw new Error('Seleccioná una imagen de perfil');
        } else {
            if (!extensionesPermitidas.includes(fileExtension.toLowerCase())) {
                throw new Error(`Las extensiones de archivo permitidas son ${extensionesPermitidas.join(", ")}`)
            }
        }
        return true;
    }),
    body('password').isLength({ min: 8 }).withMessage('Tu contraseña debe contener al menos 8 caracteres'),
    body('passwordRepetir')
        .notEmpty().withMessage('Por favor repetí la contraseña.').bail()
        .custom((value, { req }) => {
            let passOriginal = req.body.password;
            let nuevaPass = req.body.passwordRepetir;

            if (passOriginal != nuevaPass) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        })
];
const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Por favor completá tu correo').bail()
        .isEmail().withMessage('¡El formato del correo no es válido! Intentalo de nuevo'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
];

const validationsUserEdit = [
    body('nombre').notEmpty().withMessage('Por favor completá con tu nombre'),
    body('apellido').notEmpty().withMessage('Es necesario que completes tu apellido'),
    body('email')
        .notEmpty().withMessage('Por favor completá tu correo').bail()
        .isEmail().withMessage('¡El formato del correo no es válido! Intentalo de nuevo'),
    body('profilePicture').custom((value, { req }) => {
        let file = req.file;
        if (file) {
            let extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.jfif'];
            let fileExtension = path.extname(file.originalname);
            if (!file) {
                throw new Error('Seleccioná una imagen de perfil');
            } else {
                if (!extensionesPermitidas.includes(fileExtension.toLowerCase())) {
                    throw new Error(`Las extensiones de archivo permitidas son ${extensionesPermitidas.join(", ")}`)
                }
            }
            return true;
        } else {
            return true
        }
    }),
    body('password').custom((value, { req }) => {
        if (req.body.password) {
            let passNueva = req.body.password;
            if (passNueva.length < 8) {
                throw new Error('Su contraseña debe contener al menos 8 caracteres, una minuscula, una mayúscula, un número y un caracter especial.');
            }
            let passRepetir = req.body.passwordRepetir;

            if (passNueva != passRepetir) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }
        return true
    })
];

module.exports = { validationsSignup, validationsLogin, validationsUserEdit };
