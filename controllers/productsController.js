const path = require('path');

const productsController = {
    //productDetail.html
    product: (req, res) => {
        res.render('productDetail');
    },

    //productCart.html
    cart: (req, res) => {
        res.render('productCart');
    }
};
module.exports = productsController;