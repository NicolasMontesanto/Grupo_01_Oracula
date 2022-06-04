const path = require('path');
const productDetailPath = path.join(__dirname, "../src/views/productDetail.html");
const productCartPath = path.join(__dirname, "../src/views/productCart.html");

const productsController = {
    //productDetail.html
    product: (req, res) => {
        res.sendFile(productDetailPath);
    },

    //productCart.html
    cart: (req, res) => {
        res.sendFile(productCartPath);
    }
};
module.exports = productsController;