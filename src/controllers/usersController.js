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

    //profile.html
    profile: (req, res) => {
        res.render("./users/profile", { user: req.session.userLogged },)
    },
    //procesar pedido de login
    processLogin: (req, res) => {
        const validationsResult = validationResult(req);
        //Control de errores en el login
        if (validationsResult.errors.length > 0) {
            res.render("./users/login", { errors: validationsResult.mapped(), oldData: req.body });
        } else {
            let userSearch = User.findFirstByField('email', req.body.email);
            let userToLogin = Object.assign({}, userSearch);
            if (userToLogin) {
                //verifico la contraseña
                let passOK = bcrypt.compareSync(req.body.password, userToLogin.password)
                if (passOK) {
                    //borro la pass para que no quede en session
                    delete userToLogin.password;
                    //guardo el usuario loggeado en session
                    req.session.userLogged = userToLogin;
                    //compruebo si tildó recordarme
                    if (req.body.recordarPassword) {
                        res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 15 })
                    }

                    return res.redirect('/user/profile')
                } else {
                    // si no se verificó la contraseña
                    return res.render("./users/login", {
                        errors: {
                            password: {
                                msg: 'Contraseña o email incorrectos.'
                            },
                        },
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

    //signup.html
    signup: (req, res) => {
        res.cookie("recordarPassword", { maxAge: 1000 * 60 * 15 })
        res.render("./users/signup", { titulo: "Crear cuenta" });
    },
    //Guardar usuario nuevo
    store: (req, res) => {
        const validationsResult = validationResult(req);

        //si hay errores se renderiza de nuevo el formulario de register
        if (validationsResult.errors.length > 0) {
            //si se cargó una imagen, se borra
            if (req.file.filename) {
                fs.unlinkSync(path.join(__dirname, "../../public/img/Profile-pictures/", req.file.filename));
            }

            return res.render("./users/signup", {
                errors: validationsResult.mapped(),
                oldData: req.body,
            });

        } else {
            //busco si existe usuarie con el mismo mail
            let userInDB = User.findFirstByField('email', req.body.email);

            if (userInDB) {
                //si se cargó una imagen, se borra
                if (req.file.filename) {
                    fs.unlinkSync(path.join(__dirname, "../../public/img/Profile-pictures/", req.file.filename));
                }
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
            let file = req.file;
            let userToCreate = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                profilePicture: `/img/Profile-pictures/${file.filename}`,
                password: bcrypt.hashSync(req.body.password, 10),
                fechaDeCreacion: new Date(),
                isAdmin: req.body.isAdmin ? true : false,
                tieneMagicPass: false
            };

            let userCreated = User.create(userToCreate);

            res.redirect("/user/login");
        }
    },

    //Renderizar la vista de Edit
    edit: (req, res) => {
        let id = req.params.id;
        let user = User.findByPK(id);
        !user ? res.send("El usuario no existe") : res.render("./users/userEdit", { user });
    },

    update: (req, res) => {

        let id = req.params.id;
        let file = req.file;
        let { nombre, apellido, email, direccion, telefono, password } = req.body;

        const validationsResult = validationResult(req);

        //si hay errores se renderiza de nuevo el formulario de register
        if (validationsResult.errors.length > 0) {
            //si se cargó una imagen, se borra
            if (req.file && req.file.filename) {
                fs.unlinkSync(path.join(__dirname, "../../public/img/Profile-pictures/", req.file.filename));
            }
            res.render("./users/userEdit", { user: req.session.userLogged, errors: validationsResult.mapped() });
        } else {
            users.forEach((item) => {
                if (item.id == id) {
                    item.nombre = nombre;
                    item.apellido = apellido;
                    item.email = email;
                    item.direccion = direccion;
                    item.telefono = telefono;
                    if (req.body.password.length>0){
                        item.password = bcrypt.hashSync(req.body.password, 10);
                    }
                    if (file) {
                        if (item.profile) {
                            fs.unlinkSync(path.join(__dirname, "../../public/img/Profile-pictures/", item.profilePicture));
                        }
                        item.profilePicture = `/img/Profile-pictures/${file.filename}`;
                    }
                }
            });

            let usersJSON = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON, "utf-8");
            res.redirect("/user/profile");
        }
    },

    delete: (req, res) => {
        let id = req.params.id;
        User.delete(id);
        res.redirect("/");
    },
    // hacer logout
    logout: (req, res) => {
        //al cerrar sesion se borran las cookies del usuarix
        res.clearCookie('userEmail');
        res.clearCookie("recordarPassword");
        req.session.destroy();
        res.redirect("/");
    },

    // ! FALTA IMPLEMENTAR EL METODO PROFILE: que renderiza la vista por get, incorporando a usuarix loggeadx 
};
module.exports = usersController;