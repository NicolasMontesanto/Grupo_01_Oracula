const path = require("path");
const fs = require("fs");
let users = require("../data/users.json");
const db = require('../database/models');
const { promiseImpl } = require('ejs');
//express validator
const { validationResult } = require("express-validator");
//hash
const bcrypt = require('bcryptjs');

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
            db.User.findOne({
                where: {
                    email: req.body.email,
                    estaActivo: true
                }
            })
                .then((userToLogin) => {
                    // let userToLogin = Object.assign({}, userFound)
                    if (userToLogin) {
                        //verifico la contraseña
                        let passOK = bcrypt.compareSync(req.body.password, userToLogin.password)
                        if (passOK) {
                            //borro la pass para que no quede en session
                            delete userToLogin.password;
                            //guardo el usuario loggeado en session
                            req.session.userLogged = userToLogin;
                            //Busco el carrito del usuario y lo guardo en session
                            db.Cart.findOne({
                                where: {
                                    userID: userToLogin.id
                                }
                            })
                                .then(carrito => {
                                    req.session.cartID = carrito.id
                                    //compruebo si tildó recordarme
                                    if (req.body.recordarPassword) {
                                        res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 15 })
                                    }
                                    res.redirect('/user/profile')
                                })
                                .catch(error => { console.log(error) })

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
                    } else {
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

                })
                .catch(error => { console.log(error) })
                ;
        }

    },


    //signup.html
    signup: (req, res) => {
        res.cookie("recordarPassword", { maxAge: 1000 * 60 * 15 })
        res.render("./users/signup", { titulo: "Crear cuenta" });
    },
    //Guardar usuario nuevo
    store: (req, res) => {
        //Guarda el atributo file del request, donde se encuentra la imagen cargada
        let file = req.file;
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
            //Si no hay errores, se procede con la carga de usuarie
        } else {
            //busco si existe usuarie con el mismo mail
            db.User.findOne({
                where: { email: req.body.email }
            }).then((userInDB) => {
                if (userInDB) {
                    if (userInDB.estaActivo == 1) {
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
                    } else if (userInDB.estaActivo == 0) {
                        let file = req.file;
                        // let imagenDB = db.User.imagen
                        db.User.update({
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            email: req.body.email,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            estaActivo: 1,
                            password: bcrypt.hashSync(req.body.password, 10),
                            imagen: `/img/Profile-pictures/${file.filename}`
                        }, {
                            where: { id: userInDB.id }
                        })
                            .then(respuesta => {
                                res.redirect("/user/profile")
                            })
                            .catch(error => { console.log(error) })
                    }
                } else {
                    //Guarda el atributo file del request, donde se encuentra la imagen cargada
                    let file = req.file;

                    //Crea el usuarix
                    db.User.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        direccion: req.body.direccion,
                        telefono: req.body.telefono,
                        imagen: `/img/Profile-pictures/${file.filename}`,
                        password: bcrypt.hashSync(req.body.password, 10),
                        magicPass: req.body.magicPass ? true : false,
                        esAdmin: req.body.isAdmin ? true : false,
                        createdAt: new Date(),
                        estaActivo: req.body.estaActivo ? false : true
                    })
                        .then(usuarioCreado => {
                            db.Cart.create({
                                montoTotal: 0,
                                userID: usuarioCreado.id
                            })
                            res.redirect("/user/login");
                        })
                        .catch(error => { console.log(error) })

                    //let userCreated = User.create(userToCreate);
                }

            })
                .catch(error => { console.log(error) })
        }
    },


    //Renderizar la vista de Edit
    edit: (req, res) => {
        let id = req.params.id;
        db.User.findByPk(id)
            .then((user) => {
                !user ? res.send("El usuario no existe") : res.render("./users/userEdit", { user });
            })
            .catch(error => { console.log(error) });

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
            db.User.findByPk(id)
                .then(user => {
                    user.nombre = req.body.nombre;
                    user.apellido = req.body.apellido;
                    user.email = req.body.email;
                    user.direccion = req.body.direccion;
                    user.telefono = req.body.telefono;
                    if (req.body.password) {
                        user.password = bcrypt.hashSync(req.body.password, 10);
                    }
                    if (file) {
                        user.imagen = `/img/Profile-pictures/${file.filename}`;
                    }
                    user.save()
                        .then(respuesta => {
                             //borro la pass para que no quede en session
                             delete user.password;
                             //guardo el usuario loggeado en session
                             req.session.userLogged = user;
                             //Busco el carrito del usuario y lo guardo en session
                             db.Cart.findOne({
                                 where: {
                                     userID: user.id
                                 }
                             })
                                 .then(carrito => {
                                     req.session.cartID = carrito.id
                                     //compruebo si tildó recordarme
                                     if (req.body.recordarPassword) {
                                         res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 15 })
                                     }
                                     res.redirect('/user/profile')
                                 })
                                 .catch(error => { console.log(error) })
 
                            res.redirect("/user/profile")
                        })
                        .catch(error => { console.log(error) })
                })
        }
    },

    delete: (req, res) => {
        let id = req.params.id;
        db.User.findByPk(id)
            .then(
                db.User.update({
                    estaActivo: false,
                }, {
                    where: { id: id }
                }),
                res.clearCookie('userEmail', 'recordarPassword'),
                req.session.destroy(),
                res.redirect("/")
            )
            .catch(error => { console.log(error) })
    },

    // hacer logout
    logout: (req, res) => {
        //al cerrar sesion se borran las cookies del usuarix
        res.clearCookie('userEmail');
        res.clearCookie("recordarPassword");
        req.session.destroy();
        res.redirect("/");
    },

};

module.exports = usersController;