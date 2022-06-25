const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const fs = require("fs");

let pathJSON = path.join(__dirname, "../data/products.json");
let products = JSON.parse(fs.readFileSync(pathJSON, "utf-8"));

const mainController = {
    //home
    home: (req, res) => {
        res.render('home', {titulo: "Bienvenidxs a Orácula"});
    },
    //category
    category: (req, res) =>{
        let categoria = req.params.categoria; 
        productosAMostrar = products.filter(item => item.categoria == categoria);

        res.render('category', {productosAMostrar});
    }
};

module.exports = mainController;
