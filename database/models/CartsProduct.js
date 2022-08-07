const Cart = require("./Cart");
const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {
    let alias = "CartsProducts";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cartID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cart,
            }
        },
        productID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
            }
        }
    }
    let config = {
        tableName: "CartsProducts",
        timestamps: false
    }
    
    const CartProduct = sequelize.define(alias, cols, config)
    return CartProduct;
}