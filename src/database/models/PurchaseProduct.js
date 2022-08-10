

module.exports = (sequelize, dataTypes) => {
    let alias = "PurchasesProducts";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        porcentajeDescuento: {
            type: dataTypes.INTEGER,
            allowNull: false,
            default: 0,
        },
        precioFinal: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }

    }
    let config = {
        tableName: "PurchasesProducts",
        timestamps: false
    }
    
    const PurchaseProduct = sequelize.define(alias, cols, config)
    return PurchaseProduct;
}