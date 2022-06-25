const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const products = require('../data/products.json')

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
