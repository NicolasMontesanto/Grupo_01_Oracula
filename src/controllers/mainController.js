const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const fs = require("fs");


let products = require('../data/products.json');

let sortear = function(productosASortear){
    productosASortear.sort(() => Math.random() - 0.5)
}

const mainController = {
    //home
    home: (req, res) => {
      
        //traemos todos los productos destacados
        let productosDestacadosEnOrden = products.filter(item => item.esDestacado == "on");
        //desordenamos los productos destacados para que la vista nos muestre al azar cada vez     
        let productosDestacados = sortear(productosDestacadosEnOrden);

        //hacemos lo mismo con las novedades
        let novedadesEnOrden = products.filter(item => item.esNovedad == "on");
        let novedades = sortear(novedadesEnOrden);

         //hacemos lo mismo con las ofertas
         let ofertasEnOrden = products.filter(item => item.esOferta == "true");
         let ofertas = sortear(ofertasEnOrden);

        res.render('home', {products, productosDestacados, novedades, ofertas});
    },

    //category
    category: (req, res) => {
        let categoria = req.params.categoria;
        let productos = products.filter(item => item.categoria == categoria);

        let productosDestacadosEnOrden = productos.filter(item => item.esDestacado == "on");

        //desordenamos los productos destacados para que la vista de categoria nos muestre 5 al azar cada vez     
        let productosDestacados = sortear(productosDestacadosEnOrden);

            //hacemos lo mismo con las novedades
            let NovedadesEnOrden = productos.filter(item => item.esNovedad == "on");
       
            let novedades = sortear(novedadesEnOrden);
            
        res.render('category', {productos, productosDestacados, novedades });
    }
};

module.exports = mainController;
