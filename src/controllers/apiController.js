const db = require('../database/models');
const sequelize = require("sequelize");

const apiController = {
    users: (req, res) => {
        db.User.findAll()
            .then(users => {
                let usersData = [];
                users.forEach(user => {
                    let usuarie = {
                        id: user.id,
                        name: `${user.nombre} ${user.apellido}`,
                        email: user.email,
                        detail: `http://localhost:3200/api/users/${user.id}`,
                    }
                    usersData.push(usuarie)
                });

                let usersResponse = {
                    count: users.length,
                    users: usersData
                }

                return res.status(200).json(usersResponse)
            })
            .catch(error => {
                return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
            })

    },

    usersDetail: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: ["image"]
        })
            .then(users => {

                let usersData = [];
                users.forEach(user => {
                    let usuarie = {
                        id: user.id,
                        name: `${user.nombre} ${user.apellido}`,
                        email: user.email,
                        detail: `http://localhost:3200/api/users/${user.id}`,
                    }
                    usersData.push(usuarie)
                });

                users = {
                    id: users.id,
                    nombre: users.nombre,
                    categoryID: product.categoryID,
                    subcategoryID: product.subcategoryID,
                    precio: product.precio,
                    descuento: product.descuento,
                    esNovedad: product.esNovedad,
                    esDestacado: product.esDestacado,
                    esMagicPass: product.esMagicPass,
                    imagenes: product.image,
                    attributes: atributos,
                    generos: generos
                }

                res.status(200).json(product)
            })

            .catch(error => {
                return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
            })

    },

    products: (req, res) => {
    let promesaProductos =   db.Product.findAll({include: {
        model: db.Genre,
        as: "genre",
        attributes:["nombre"],
        through: {attributes: []}
    }})
    let categorias = db.Product.findAll({
        attributes: ['categoryID', [sequelize.fn('count', sequelize.col('categoryID')), 'cantidad']],
        group: ['categoryID'],
    })
    
    Promise.all([promesaProductos, categorias])
    .then(([products, categorias]) => {
     

                let productsData = [];
               products.forEach(prod => {
                    let producto = {
                        id: prod.id,
                        name: prod.nombre,
                        description: prod.descripcion,
                        subcategoryID: prod.subcategoryID,
                        detail: `http://localhost:3200/api/products/${prod.id}`,
                        generos : prod.genre
                    }
                   productsData.push(producto)
                });

                let productsResponse = {
                    count: products.length,
                    countByCatergory: categorias,
                    products: productsData                    
                }
                res.status(200).json(productsResponse)
            })
            .catch(error => {
                return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
            })
    },

    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ["image", "attribute", "genre"
            ]
        })
            .then(product => {

                let atributos = [];
                product.attribute.forEach(element => {
                    let atributo = {
                        id: element.id,
                        nombre: element.nombre,
                        unidad: element.unidad,
                        valor: element.AttributeProduct.valor
                    }
                    atributos.push(atributo)
                });

                let generos = [];
                product.genre.forEach(genre => {
                    let genero = {
                        id: genre.id,
                        nombre: genre.nombre
                    }
                    generos.push(genero)
                });

                product = {
                    id: product.id,
                    nombre: product.nombre,
                    categoryID: product.categoryID,
                    subcategoryID: product.subcategoryID,
                    precio: product.precio,
                    descuento: product.descuento,
                    esNovedad: product.esNovedad,
                    esDestacado: product.esDestacado,
                    esMagicPass: product.esMagicPass,
                    imagenes: product.image,
                    attributes: atributos,
                    generos: generos
                }

                res.status(200).json(product)
            })

            .catch(error => {
                return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
            })
    }


}

module.exports = apiController; 