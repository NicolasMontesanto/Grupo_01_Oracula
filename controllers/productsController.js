const path = require('path');
const db = require('../src/model/categorias.json');

const productsController = {
    //productDetail.html
    product: (req, res) => {
        res.render('productDetail');
    },

    //productCart.html
    cart: (req, res) => {
        res.render('productCart');
    },

    //productCreate
    create: (req,res) => {
        res.render('crearProducto');
    },

    //productEdit
    create: (req,res) => {
        res.render('editarProducto');
    }
};
module.exports = productsController;