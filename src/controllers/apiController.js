const db = require('../database/models');
const sequelize = require("sequelize");

const apiController = {
    users: (req, res) => {
        db.User.findAll({
            attributes: [
            "id",
            [sequelize.fn('concat', sequelize.col('nombre'), ' ', sequelize.col('apellido')),"name"],
             "email",
            [sequelize.fn('concat', 'http://localhost:3200/api/users/', sequelize.col('id')), "detail"]
            ]
         }     )
            .then(users => {
                
                let usersResponse = {
                    count: users.length,
                    users: users
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
            attributes: [
                "id", 
                [sequelize.col("Product.nombre"),"name"],
                [sequelize.col("descripcion"),"description"],
                "subcategoryId",
                [sequelize.fn('concat', 'http://localhost:3200/api/products/', sequelize.col('Product.id')), "detail"]
                ],
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

                let productsResponse = {
                    count: products.length,
                    countByCatergory: categorias,
                    products
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