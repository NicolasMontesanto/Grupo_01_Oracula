const path = require('path');
const fs = require("fs");

let pathJSON = path.join(__dirname, "../data/products.json");
let products = JSON.parse(fs.readFileSync(pathJSON, "utf-8"));

const productsController = {
    //productDetail.html
    detail: (req, res) => {
        let id = req.params.id;
        let elProducto = products.find(element => element.id == id)
        res.render('./products/productDetail', {products});
    },

    //productCart.html
    cart: (req, res) => {
        res.render('./products/productCart', {products});
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
        let productNuevo = {
            id: siguienteID(products),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            moneda: req.body.moneda,
            precio: req.body.precio,
            imagenes: `/img/productos/${file.filename}`,
            categoria: req.body.categoria,
            subcategoria: req.body.subcategoria,
            esNovedad: req.body.esNovedad,
            esDestacado: req.body.esDestacado, 
            esOferta: req.body.esOferta,
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
        res.render('./products/productEdit', {product});
    },
    update: (req, res) =>{
        let file = req.file; 
        let id = req.params.id;
        products.forEach(product => {
			if (product.id == id) {
                product.nombre= req.body.nombre,
                product.descripcion= req.body.descripcion,
                product.moneda= req.body.moneda,
                product.precio= req.body.precio,
                product.imagenes= `/img/productos/${file.filename}`,
                product.categoria= req.body.categoria,
                product.subcategoria= req.body.subcategoria,
                product.esNovedad= req.body.esNovedad,
                product.esDestacado= req.body.esDestacado, 
                product.esOferta= req.body.esOferta,
                product.descuento= req.body.descuento,     
                product.fechaDeCreacion= new Date()
			}
		})
        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(pathJSON, productsJSON, "utf-8");
        res.redirect("/");
    },
    delete: (req, res) =>{
        let id = req.params.id;
        let productDelete = products.find((item)=>{item.id == id});

        let productImg = path.join(__dirname, "../../public/img/productos/" + productDelete.imagenes);

        products = products.filter(product => product.id!=id);

        if(fs.existsSync(productImg)){
            fs.unlinkSync(productImg);
        }
       
        let productsJSON = JSON.stringify(products, null, 4);
        fs.writeFileSync(pathJSON, productsJSON, "utf-8");
        res.redirect("/");
    }
};
module.exports = productsController;