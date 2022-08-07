const Genre = require("./Genre");

module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsGenres";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
            }
        },
        genreID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Genre,
            }
        }
    }
    let config = {
        tableName: "ProductsGenres",
        timestamps: false
    }
    
    const  ProductGenre = sequelize.define(alias, cols, config)
    return ProductGenre;
}