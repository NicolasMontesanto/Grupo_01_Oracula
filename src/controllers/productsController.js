const path = require('path');
const fs = require("fs");

let products = require('../data/products.json');

const productsController = {
    //productDetail.html
    detail: (req, res) => {
        let id = req.params.id;
        let elProducto = products.find(element => element.id == id)
        res.render('./products/productDetail', { elProducto, products });
    },

    //productCart.html
    cart: (req, res) => {
        res.render('./products/productCart', { products });
    },

    //Renderizar Vista Create
    create: (req, res) => {
        res.render('./products/productCreate');
    },
    //Guardar producto nuevo
    store: (req, res) => {
        //función que busca el mayor ID y devuelve el siguiente
        function siguienteID(products) {
            let id = 1;
            for (let i = 1; i < products.length; i++) {
                if (products[i].id > id) {
                    id = products[i].id;
                }
            }
            return id += 1;
        }
        let file = req.file;

        //tomamos los datos del req.body
        let esDestacado, esNovedad, esOferta;
        if(req.body.esDestacado){
            esDestacado = true;
        }else{
            esDestacado = false;
        }
        if(req.body.esNovedad){
            esNovedad = true;
        }else{
            esNovedad = false;
        }
        if(req.body.esOferta){
            esOferta = true;
        }else{
            esOferta = false;
        }
        let productNuevo = {
            id: siguienteID(products),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            moneda: req.body.moneda,
            precio: req.body.precio,
            imagenes: `/img/productos/${file.filename}`,
            categoria: req.body.categoria,
            subcategoria: req.body.subcategoria,
            esNovedad: esNovedad,
            esDestacado: esDestacado,
            esOferta: esOferta,
            descuento: req.body.descuento,
            fechaDeCreacion: new Date()
        }
        products.push(productNuevo);
        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(pathJSON, productsJSON, "utf-8");

        res.redirect("/");
    },

    //Renderizamos la vista de Edit
    edit: (req, res) => {
        let id = req.params.id;
        let product = products.find(element => element.id == id);
        if (product == undefined) {
            res.send("Producto no encontrado");
        } else {
            res.render('./products/productEdit', { product });
        }
    },
    update: (req, res) => {
        let id = req.params.id;
        let file = req.file;
        let { nombre, descripcion, precio, categoria, subcategoria, esNovedad, esDestacado, esOferta, descuento } = req.body;
        if(req.body.esDestacado){
            esDestacado = true;
        }else{
            esDestacado = false;
        }
        if(req.body.esNovedad){
            esNovedad = true;
        }else{
            esNovedad = false;
        }
        if(req.body.esOferta){
            esOferta = true;
        }else{
            esOferta = false;
        }
        products.forEach(item => {
            if (item.id == id) {
                item.nombre = nombre;
                item.descripcion = descripcion;
                item.precio = precio;
                item.categoria = categoria;
                item.subcategoria = subcategoria;
                item.esNovedad = esNovedad;
                item.esDestacado = esDestacado;
                item.esOferta = esOferta;
                item.descuento = descuento;
                if (file) {
                    item.imagenes = `img/${file.filename}`;
                }
            }
        });
        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(pathJSON, productsJSON, "utf-8");
        res.redirect("/");
    },
    delete: (req, res) => {
        let id = req.params.id;
        let productToDelete = products.find(item => item.id == id );

        let productImg = path.join(__dirname, "../../public/img/productos" + productToDelete.imagenes);

        products = products.filter(product => product.id != id);

        if (fs.existsSync(productImg)) {
            fs.unlinkSync(productImg);
        }

        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(pathJSON, productsJSON, "utf-8");
        res.redirect("/");
    }
};
module.exports = productsController;