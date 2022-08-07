
const Favorite = require("./Favorite");

module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsFavorites";
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
        favoriteID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Favorite,
            }
        }
    }
    let config = {
        tableName: "ProductsFavorites",
        timestamps: false
    }
    
    const ProductFavorite = sequelize.define(alias, cols, config)
    return ProductFavorite;
}