const path = require('path');

const productsController = {
    //productDetail.html
    product: (req, res) => {
        res.render('productDetail', {titulo: "Detalle de producto"});
    },

    //productCart.html
    cart: (req, res) => {
        res.render('productCart', {titulo: "Carrito de compras"});
    },

    //productCreate
    create: (req,res) => {
        res.render('productCreate', {titulo: "Registrar producto"});
    },

    //productEdit
    edit: (req,res) => {
        res.render('productEdit', {titulo: "Editar producto"});
    }
};
module.exports = productsController;