const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const fs = require("fs");

let pathJSON = path.join(__dirname, "../data/products.json");
let products = JSON.parse(fs.readFileSync(pathJSON, "utf-8"));

const mainController = {
    //home
    home: (req, res) => {
        res.render('home', { titulo: "Bienvenidxs a Orácula" });
    },
    //category
    category: (req, res) => {
        let categoria = req.params.categoria;
        let productosAMostrar = products.filter(item => item.categoria == categoria);

        let productosDestacadosEnOrden = products.filter(item => item.esDestacado == "on");

        //desordenamos los productos destacados para que la vista de categoria nos muestre 5 al azar cada vez     
        let productosDestacados = productosDestacadosEnOrden.sort(() => Math.random() - 0.5);


        res.render('category', { productosAMostrar, productosDestacados });
    }
};

module.exports = mainController;
