const path = require('path');

const productsController = {
    //productDetail.html
    product: (req, res) => {
        res.render('./products/productDetail', {titulo: "Detalle de producto"});
    },

    //productCart.html
    cart: (req, res) => {
        res.render('./products/productCart', {titulo: "Carrito de compras"});
    },

    //productCreate
    create: (req,res) => {
        res.render('./products/productCreate', {titulo: "Registrar producto"});
    },

    //productEdit
    edit: (req,res) => {
        res.render('./products/productEdit', {titulo: "Editar producto"});
    }
};
module.exports = productsController;