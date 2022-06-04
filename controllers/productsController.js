const path = require ('path');
const productDetailPath = path.join(__dirname, "views/productDetail.html");
const productsController = {
    products: (req, res)=>{
        res.sendFile(productDetailPath);
        },
    cart:     
};
modules.exports = controller;