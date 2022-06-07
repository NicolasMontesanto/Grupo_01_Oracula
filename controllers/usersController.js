const path = require('path');
const login = path.join(__dirname, "../src/views/login.html");
const signup = path.join(__dirname, "../src/views/signup.html");

const usersController = {
    //login.html
    login: (req, res) => {
        res.render('login');
    },

    //signup.html
    signup: (req, res) => {
        res.render('signup');
    }
};
module.exports = usersController;