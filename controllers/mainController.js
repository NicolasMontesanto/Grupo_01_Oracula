const path = require('path');
const homePath = path.join(__dirname, "views/home.html");
const controller = {
    index: (req, res)=>{
        res.sendFile(homePath);
        }
};
modules.exports = controller;
