const path = require('path');
const fs = require("fs");
let products = require('../data/products.json');
//express validator
const { validationResult } = require('express-validator');

let sortear = function(productosASortear){
    let sorteados = productosASortear.sort(() => Math.random() - 0.5)
    return sorteados;
}

const productsController = {
    //productDetail.html
    detail: (req, res) => {
        let id = req.params.id;
        let elProducto = products.find(element => element.id == id)
        let productosDeCategoria = products.filter(item => item.categoria == elProducto.categoria && item!=elProducto);
        let productosDesordenados = sortear(productosDeCategoria);

        res.render('./products/productDetail', { elProducto, productosDesordenados });
    },

    //productCart.html
    cart: (req, res) => {
        res.render('./products/productCart', { products });
    },
    
    //Renderizar vista de todos los productos
    list: (req, res) => {
        res.render('./products/productList', { products });
    },


    //Renderizar Vista Create
    create: (req, res) => {
        res.render('./products/productCreate');
    },

    
    
    //Guardar producto nuevo
    store: (req, res) => {

       const validationsResult =  validationResult(req);

        //si hay errores se renderiza de nuevo el formulario de creación
       if(validationsResult.errors.length > 0) {
        res.render('./products/productCreate', {
            errors : validationsResult.mapped(),
            oldData : req.body
        })}
        else{           
            
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
            //Valores de esDestacado, esNovedad, esOferta
            let esDestacado, esNovedad, esOferta;
            
            esDestacado = req.body.esDestacado?true:false;
            esNovedad = req.body.esNovedad?true:false;
            esOferta = req.body.esOferta?true:false;
            
            //Array de Objetos Género
            let generos = [];
            if (req.body.esGeneroMedieval) {
                generos.push("medieval");
            }
        if (req.body.esGeneroUrbana) {
            generos.push("urbana");
        }
        if (req.body.esGeneroClasica) {
            generos.push("clasica");
        }
        if (req.body.esGeneroOscura) {
            generos.push("oscura");
        }
        if (req.body.esGeneroJuvenil) {
            generos.push("juvenil");
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
            generos: generos,
            esNovedad: esNovedad,
            esDestacado: esDestacado,
            esOferta: esOferta,
            descuento: req.body.descuento,
            fechaDeCreacion: new Date()
        }
        products.push(productNuevo);
        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), productsJSON, "utf-8");
        
        res.redirect("/");
    }
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

        //Valores de esDestacado, esNovedad, esOferta
        let esNovedad, esDestacado, esOferta;
        
        esDestacado = req.body.esDestacado?true:false;
        esNovedad = req.body.esNovedad?true:false;
        esOferta = req.body.esOferta?true:false;

        //Array de Objetos Género
        let generos = [];
        if (req.body.esGeneroMedieval) {
            generos.push("medieval");
        }
        if (req.body.esGeneroUrbana) {
            generos.push("urbana");
        }
        if (req.body.esGeneroClasica) {
            generos.push("clasica");
        }
        if (req.body.esGeneroOscura) {
            generos.push("oscura");
        }
        if (req.body.esGeneroJuvenil) {
            generos.push("juvenil");
        }

        let { nombre, descripcion, precio, categoria, subcategoria, descuento } = req.body;
        products.forEach(item => {
            if (item.id == id) {
                item.nombre = nombre;
                item.descripcion = descripcion;
                item.precio = precio;
                item.categoria = categoria;
                item.subcategoria = subcategoria;
                item.generos = generos;
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
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), productsJSON, "utf-8");
        res.redirect("/");
    },
    delete: (req, res) => {
        let id = req.params.id;
        let productToDelete = products.find(item => item.id == id);

        let productImg = path.join(__dirname, "../../public/img/productos" + productToDelete.imagenes);

        products = products.filter(product => product.id != id);

        if (fs.existsSync(productImg)) {
            fs.unlinkSync(productImg);
        }

        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), productsJSON, "utf-8");
        res.redirect("/");
    }
};
module.exports = productsController;