
const User = require("./User");

module.exports = (sequelize, dataTypes) => {
    let alias = "Wishlists";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
            }
        }
    }
    let config = {
        tableName: "Wishlists",
        timestamps: false
    }
    
    const Wishlist = sequelize.define(alias, cols, config)
    return Wishlist;
}