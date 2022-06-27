const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const fs = require("fs");


let products = require('../data/products.json');

const mainController = {
    //home
    home: (req, res) => {
      
        //traemos todos los productos destacados
        let productosDestacadosEnOrden = products.filter(item => item.esDestacado == "on");

        //desordenamos los productos destacados para que la vista nos muestre al azar cada vez     
        let productosDestacados = productosDestacadosEnOrden.sort(() => Math.random() - 0.5);

        //hacemos lo mismo con las novedades
        let NovedadesEnOrden = products.filter(item => item.esNovedad == "on");
       
        let novedades = NovedadesEnOrden.sort(() => Math.random() - 0.5);

        res.render('home', {products, productosDestacados, novedades});
    },

    //category
    category: (req, res) => {
        let categoria = req.params.categoria;
        let productos = products.filter(item => item.categoria == categoria);

        let productosDestacadosEnOrden = productos.filter(item => item.esDestacado == "on");

        //desordenamos los productos destacados para que la vista de categoria nos muestre 5 al azar cada vez     
        let productosDestacados = productosDestacadosEnOrden.sort(() => Math.random() - 0.5);

            //hacemos lo mismo con las novedades
            let NovedadesEnOrden = productos.filter(item => item.esNovedad == "on");
       
            let novedades = NovedadesEnOrden.sort(() => Math.random() - 0.5);
            
        res.render('category', {productos, productosDestacados, novedades });
    }
};

module.exports = mainController;
