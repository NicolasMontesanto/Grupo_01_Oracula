const User = require("./User");

module.exports = (sequelize, dataTypes) => {
    let alias = "Purchases";
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
        },
        montoTotal: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATETIME,
            allowNull: false
        },
        esCancelado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    }
    let config = {
        tableName: "Purchases",
        timestamps: false
    }
    
    const Purchase = sequelize.define(alias, cols, config)
    return Purchase;
}