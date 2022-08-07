const User = require("./User");

module.exports = (sequelize, dataTypes) => {
    let alias = "Carts";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        montoTotal: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
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
        tableName: "Carts",
        timestamps: false
    }
    
    const Cart = sequelize.define(alias, cols, config)
    return Cart;
}