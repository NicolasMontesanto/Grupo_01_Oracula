const { body } = require('express-validator');
const path = require('path');


const validationsSignup = [
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
    body('profilePicture').custom((value, { req }) => {
        let file = req.file;
        let extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.jfif'];
        let fileExtension = path.extname(file.originalname);
        if (!file) {
            throw new Error('Seleccioná una imagen para tu producto');
        } else {
            if (!extensionesPermitidas.includes(fileExtension.toLowerCase())) {
                throw new Error(`Las extensiones de archivo permitidas son ${extensionesPermitidas.join(", ")}`)
            }
        }
        return true;
    })
];
const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Por favor completá tu correo').bail()
        .isEmail().withMessage('¡El formato del correo no es válido! Intentalo de nuevo'),
    body('password').notEmpty().withMessage('No olvides tu contraseña'),
];

module.exports = {validationsSignup, validationsLogin};
