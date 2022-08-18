const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const fs = require("fs");

//prueba de conexion a la db 
const db = require('../database/models');
const sequelize = require('sequelize');




let products = require('../data/products.json');


let sortear = function (productosASortear) {
    let sorteados = productosASortear.sort(() => Math.random() - 0.5)
    return sorteados;
}

const mainController = {

    //prueba conectividad 
    estaConectado: {
        funciona: (req, res) => {
            db.Category.findByPk(1)
                .then(category => {
                    console.log(category.nombre)
                    if (category.nombre == 'Juegos') {
                        res.send('Funciona!!');
                    }
                });
        }
    },

    //home
    home: (req, res) => {
        let promesaOfertas = db.Product.findAll({
            where: {
                descuento: { [sequelize.Op.gt]: 0 },

            },
            include: ['image'],
            raw: true,
            nest: true
        }
        );
        let promesaDestacados = db.Product.findAll({
            where: {
                esDestacado: true
            },
            include: ['image'],
            raw: true,
            nest: true
        }
        );
        let promesaNovedades = db.Product.findAll({
            where: {
                esNovedad: true
            },
            include: ['image'],
            raw: true,
            nest: true
        }
        );

        Promise.all([promesaOfertas, promesaDestacados, promesaNovedades])
            .then(function ([resultadoOfertas, resultadoDestacados, resultadoNovedades]) {
                productosDestacados = sortear(resultadoDestacados);
                novedades = sortear(resultadoNovedades);
                ofertas = sortear(resultadoOfertas)
                res.render('./home', { productosDestacados, novedades, ofertas });
            })
            .catch(error =>
                console.log(error))

    },

    //category
    category: (req, res) => {

        let categoriaID = req.params.id;
        db.Product.findAll({
            where: {
                categoryID: categoriaID,
            },
            raw: true,
            nest: true,
            include: ['image']

        })
            .then(productos => {
                console.log(productos);
                let productosDestacadosEnOrden = productos.filter(item => item.esDestacado == true);

                //desordenamos los productos destacados para que la vista de categoria nos muestre 5 al azar cada vez     
                let productosDestacados = sortear(productosDestacadosEnOrden);

                //hacemos lo mismo con las novedades
                let novedadesEnOrden = productos.filter(item => item.esNovedad == true);

                let novedades = sortear(novedadesEnOrden);

                res.render('category', { productos, productosDestacados, novedades });


            })
            .catch(error =>
                console.log(error))



        // let productos = products.filter(item => item.categoria == categoria);

        // let productosDestacadosEnOrden = productos.filter(item => item.esDestacado == true);

        // //desordenamos los productos destacados para que la vista de categoria nos muestre 5 al azar cada vez     
        // let productosDestacados = sortear(productosDestacadosEnOrden);

        // //hacemos lo mismo con las novedades
        // let novedadesEnOrden = productos.filter(item => item.esNovedad == true);

        // let novedades = sortear(novedadesEnOrden);

        // res.render('category', { productos, productosDestacados, novedades });
    }
};

module.exports = mainController;
