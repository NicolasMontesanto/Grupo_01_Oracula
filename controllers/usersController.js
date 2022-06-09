const path = require('path');
const login = path.join(__dirname, "../src/views/login.html");
const signup = path.join(__dirname, "../src/views/signup.html");

const usersController = {
    //login.html
    login: (req, res) => {
        res.render('./users/login', {titulo: "Ingresar"});
    },

    //signup.html
    signup: (req, res) => {
        res.render('./users/signup', {titulo: "Crear cuenta"});
    }
};
module.exports = usersController;