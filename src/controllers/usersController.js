const path = require("path");
const fs = require("fs");
let users = require("../data/users.json");
//express validator
const { validationResult } = require("express-validator");
//hash
const bcrypt = require('bcryptjs');

//funciones para usuarios
const User = require('../models/User')

const usersController = {
    //login.html
    login: (req, res) => {
        res.render("./users/login", { titulo: "Ingresar" });
    },

    processLogin: (req, res) => {
        const validationsResult = validationResult(req);
        //Control de errores en el login
        if (validationsResult.errors.length > 0){
            res.render("./users/login", { errors: validationsResult.mapped(), oldData: req.body});
        } else {
            let userToLogin = User.findFirstByField('email', req.body.email);
            
            if(userToLogin){
              //verifico la contraseña
             let passOK = bcrypt.compareSync(req.body.password, userToLogin.password)
             if (passOK){
                //borro la pass para que no quede en session
                delete userToLogin.password;
                //guardo el usuario loggeado en session
                req.session.userLogged = userToLogin;

                // ! ESTO EN REALIDAD DEBERIA REDIRIGIR AL PERFIL cuando la vista de perfil esté hecha 
                return res.redirect('/')
             }else {
                return res.render("./users/login", {
                    errors: {
                        password: {
                            msg: 'La contraseña es incorrecta. Inténtalo nuevamente.'
                        },
                    } ,  
                    oldData: req.body,            
                });
             }
            } 
            return res.render("./users/login", {
                errors: {
                    email: {
                        msg: 'El email ingresado no pertenece a una cuenta de Orácula'
                    },
                } ,  
                oldData: req.body,            
            });

        }
    },
    //signup.html
    signup: (req, res) => {
        res.render("./users/signup", { titulo: "Crear cuenta" });
    },

    //Guardar usuario nuevo
    store: (req, res) => {
        const validationsResult = validationResult(req);

           //si hay errores se renderiza de nuevo el formulario de register
        if (validationsResult.errors.length > 0) {
            //si se cargó una imagen, se borra
            if(req.file.filename) fs.unlinkSync(path.join(__dirname, "../../public/img/Profile-pictures/", req.file.filename));
            
           return res.render("./users/signup", {
             errors: validationsResult.mapped(),
              oldData: req.body,
            });

        }else {                              
            //busco si existe usuarie con el mismo mail
            let userInDB = User.findFirstByField('email', req.body.email);
            
            if(userInDB){
                return res.render("./users/signup", {
                    errors: {
                        email: {
                            msg: "Este email ya esta registrado",
                        }
                    },
                    oldData: req.body,
                   });
            }
            
            //tomamos los datos del req.body
            let userToCreate = {
                email: req.body.email,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                password: bcrypt.hashSync(req.body.password, 10),
                fechaDeCreacion: new Date(),
                esAdmin: req.body.esAdmin?true:false
            };
            
            let userCreated = User.create(userToCreate);

            res.redirect("/user/login");
        }
    },

    //Renderizar la vista de Edit
    edit: (req, res) => {
        let id = req.params.id;
        let user = User.findByPK(id);
        !user?res.send("El usuario no existe"):res.render("./users/userEdit", { user });
    },

    update: (req, res) => {
        
        let id = req.params.id;
        //let file = req.file;
        let { email, nombre, apellido, password } = req.body;

        users.forEach((item) => {
            if (item.id == id) {
                item.email = email;
                item.nombre = nombre;
                item.apellido = apellido;
                item.password = password;
            }
        });

        let usersJSON = JSON.stringify(users, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON, "utf-8");
        res.redirect("/");
    },

    delete: (req, res) => {
        let id = req.params.id;
        User.delete(id);
        res.redirect("/");
    },

    // ! FALTA IMPLEMENTAR EL METODO PROFILE: que renderiza la vista por get, incorporando a usuarix loggeadx 
};
module.exports = usersController;
