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
            attributes: { exclude: ['password', "createdAt"] }
        })
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => {
                return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
            })
    },

    products: (req, res) => {
        let promesaProductos = db.Product.findAll({
            include: {
                model: db.Genre,
                as: "genre",
                attributes: ["nombre"],
                through: { attributes: [] }
            }
        })
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
                        generos: prod.genre
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
            attributes:{exclude: ["createdAt",
                "updatedAt",
                "categoryID",
                "subcategoryID"]},
            include: ["image", {
                model: db.Attribute,
                as: "attribute",
                attributes: { exclude: ["id", "subcategoryID"] },
                through: { attributes: ["valor"] },
            }]
         
        })
            .then(product => {
                return res.status(200).json(product);
            })

            .catch(error => {
                return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
            })
    }


}

module.exports = apiController; 