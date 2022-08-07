const Wishlist = require("./Wishlist");

module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsWishlists";
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
        wishlistID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Wishlist,
            }
        }
    }
    let config = {
        tableName: "ProductsWishlists",
        timestamps: false
    }
    
    const ProductWishlist = sequelize.define(alias, cols, config)
    return ProductWishlist;
}