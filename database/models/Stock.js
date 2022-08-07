
module.exports = (sequelize, dataTypes) => {
    let alias = "Stocks";
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
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        updatedAt: {
            type: dataTypes.DATETIME,
            allowNull: false
        }
    }
    let config = {
        tableName: "Stocks",
        timestamps: false
    }
    
    const Stock = sequelize.define(alias, cols, config)
    return Stock;
}