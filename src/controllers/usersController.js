const path = require('path');
const fs = require("fs");
let users = require('../data/users.json');
//express validator
const { validationResult } = require('express-validator');

const usersController = {
    //login.html
    login: (req, res) => {
        res.render('./users/login', { titulo: "Ingresar" });
    },

    //signup.html
    signup: (req, res) => {
        res.render('./users/signup', { titulo: "Crear cuenta" });
    },

    //Guardar usuario nuevo
    store: (req, res) => {
        const validationsResult =  validationResult(req);

        //si hay errores se renderiza de nuevo el formulario de register
       if(validationsResult.errors.length > 0) {
            res.render('./users/signup', {
            errors : validationsResult.mapped(),
            oldData : req.body
        })}
        else{ 
        //función que busca el mayor ID y devuelve el siguiente
        function siguienteID(users) {
           let id = 1;
            for (let i = 1; i < users.length; i++) {
                if (users[i].id > id) {
                    id = users[i].id;
                }
            }
            return id += 1;
        }
       
        //tomamos los datos del req.body
        let userNuevo = {
            id: siguienteID(users),
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contraseña: req.body.contraseña,
            fechaDeCreacion: new Date(),
            imagenPerfil: req.body.profile-picture 
        }
        
        users.push(userNuevo);
        let usersJSON = JSON.stringify(users, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON, "utf-8");

        res.redirect("/user/login");
    }
    },

    //Renderizar la vista de Edit
    edit: (req, res) => {
        let id = req.params.id;
        let user = users.find( element => element.id == id);
        if (user == undefined) {
            res.send("El usuario no existe");
        } else {
            res.render('./users/userEdit', { user });
        }
    },

    update: (req, res) => {
        let id = req.params.id;
       //let file = req.file;
        let { email, nombre, apellido, contraseña } = req.body;
       
        users.forEach(item => {
            if (item.id == id) {
                item.email = email;
                item.nombre = nombre;
                item.apellido = apellido;
                item.contraseña = contraseña;
             }
        });
        let usersJSON = JSON.stringify(users, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON, "utf-8");
        res.redirect("/");
    },

    delete: (req, res) =>{
        let id = req.params.id;
        let userDelete = users.find((item)=>{item.id == id});
             
        users = users.filter(user => user.id!=id);
       
        let usersJSON = JSON.stringify(users, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersJSON, "utf-8");
        res.redirect("/");
    }
};
module.exports = usersController;