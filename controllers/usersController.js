const path = require('path');
const login = path.join(__dirname, "../src/views/login.html");
const signup = path.join(__dirname, "../src/views/signup.html");

const usersController = {
    //login.html
    login: (req, res) => {
        res.sendFile(login);
    },

    //signup.html
    signup: (req, res) => {
        res.sendFile(signup);
    }
};
module.exports = usersController;