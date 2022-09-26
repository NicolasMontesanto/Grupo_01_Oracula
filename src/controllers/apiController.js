const db = require('../database/models');
const sequelize = require("sequelize");

const apiController = {
    users: (req, res) => {
        let pageComoNumero = Number.parseInt(req.query.page)
        let page = 0;
        if(!Number.isNaN(pageComoNumero) && pageComoNumero>0){
            page = pageComoNumero;
        }

        db.User.findAndCountAll({
            attributes: [
            "id",
            [sequelize.fn('concat', sequelize.col('nombre'), ' ', sequelize.col('apellido')),"name"],
             "email",
            [sequelize.fn('concat', 'http://localhost:3200/api/users/', sequelize.col('id')), "detail"]
            ],
            distinct:true,
            limit: 10,
            offset: page * 10
         }     )
            .then(users => {

                let previousPage = page>0?`http://localhost:3200/api/users/?page=${page-1}`:"" 
                let nextPage = (page+1)<=(users.count/10)?`http://localhost:3200/api/users/?page=${page+1}`:"" 
                
                let usersResponse = {
                    count: users.count,
                    users: users.rows,
                    next: nextPage,
                    previous: previousPage
                    
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

        let pageComoNumero = Number.parseInt(req.query.page)
        let page = 0;
        if(!Number.isNaN(pageComoNumero) && pageComoNumero>0){
            page = pageComoNumero;
        }

        let promesaProductos = db.Product.findAndCountAll({
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
            },
            distinct:true,
            limit: 10,
            offset: page * 10
        })
        let categorias = db.Product.findAll({
            attributes: ['categoryID', [sequelize.fn('count', sequelize.col('categoryID')), 'cantidad']],
            group: ['categoryID'],
        })

        Promise.all([promesaProductos, categorias])
            .then(([products, categorias]) => {

                let previousPage = page>0?`http://localhost:3200/api/products/?page=${page-1}`:"" 
                let nextPage = (page+1)<=(products.count/10)?`http://localhost:3200/api/products/?page=${page+1}`:"" 

                let productsResponse = {
                    count: products.count,
                    countByCategory: categorias,
                    products: products.rows,
                    next: nextPage,
                    previous: previousPage
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