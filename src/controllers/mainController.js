const path = require('path');
const homePath = path.join(__dirname, '../views/home.html');
const fs = require("fs");

//prueba de conexion a la db 
const db = require('../database/models');
const sequelize = require('sequelize');


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
            include: ['image', 'subcategory'],
            raw: true,
            nest: true
        }
        );
        let promesaDestacados = db.Product.findAll({
            where: {
                esDestacado: true
            },
            include: ['image', 'subcategory'],
            raw: true,
            nest: true
        }
        );
        let promesaNovedades = db.Product.findAll({
            where: {
                esNovedad: true
            },
            include: ['image', 'subcategory'],
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

        let promesaCategoria = db.Category.findByPk(categoriaID);

        let promesaProductosDeCategoria = db.Product.findAll({
            where: {
                categoryID: categoriaID,
            },
            raw: true,
            nest: true,
            include: ['image', 'subcategory']
        })

        let promesaDestacados = db.Product.findAll({
            where: {
                esDestacado: true,
                categoryID: categoriaID
            },
            include: ['image', 'subcategory'],
            raw: true,
            nest: true
        }
        );
        let promesaNovedades = db.Product.findAll({
            where: {
                esNovedad: true,
                categoryID: categoriaID
            },
            include: ['image', 'subcategory'],
            raw: true,
            nest: true
        }
        );

        Promise.all([promesaProductosDeCategoria, promesaNovedades, promesaDestacados, promesaCategoria])
            .then(function ([resultadoProductosDeCategoria, resultadoNovedades, resultadoDestacados, resultadoCategoria]) {

                let productosDestacados = sortear(resultadoDestacados);

                let novedades = sortear(resultadoNovedades);

                res.render('category', { productos: resultadoProductosDeCategoria, productosDestacados, novedades, categoria: resultadoCategoria });


            })
            .catch(error =>
                console.log(error))

    }
};

module.exports = mainController;
