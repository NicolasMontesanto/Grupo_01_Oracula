const path = require("path");
const fs = require("fs");
let users = require("../data/users.json");
//express validator
const { validationResult } = require("express-validator");
//hash
const bcrypt = require('bcryptjs');

//funciones para usuarios
const User = require('../models/User');
const { log } = require("console");

const usersController = {
    //login.html
    login: (req, res) => {
        res.render("./users/login", { titulo: "Ingresar" });
    },
    //procesar pedido de login
    processLogin: (req, res) => {
        const validationsResult = validationResult(req);
        //Control de errores en el login
        if (validationsResult.errors.length > 0){
            res.render("./users/login", { errors: validationsResult.mapped(), oldData: req.body});
        } else {
            //buscamos los datos delle usuarix por el mail
            let userSearch = User.findFirstByField('email', req.body.email);
            //clonamos elle usuarix encontradx
            let userToLogin = Object.assign({}, userSearch);

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
                // si no se verificó la contraaseña
                return res.render("./users/login", {
                    errors: {
                        password: {
                            msg: 'Contraseña o email incorrectos.'
                        },
                    } ,  
                    oldData: req.body,            
                });
             }
            }
            // si no se verificó el mail 
            return res.render("./users/login", {
                errors: {
                    email: {
                        msg: 'Contraseña o email incorrectos.'
                    },
                },  
                oldData: req.body,            
            });
        }
    },
    // hacer logout
    logout: (req, res) => {
        req.session.destroy();        
        res.redirect("/");
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
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                direccion:req.body.direccion,
                telefono:req.body.telefono,
                profilePicture: req.body.profilePicture,
                password: bcrypt.hashSync(req.body.password, 10),
                fechaDeCreacion: new Date(),
                isAdmin: req.body.isAdmin?true:false
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
        let { nombre, apellido, email, direccion, telefono, profilePicture, password } = req.body;

        users.forEach((item) => {
            if (item.id == id) {
                item.nombre = nombre;
                item.apellido = apellido;
                item.email = email;
                item.direccion = direccion;
                item.telefono = telefono;
                item.password = password;
                if (file) {
                    item.imagenes = `img/${file.filename}`;
                }
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
