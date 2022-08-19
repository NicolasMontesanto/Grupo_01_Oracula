
module.exports = (sequelize, dataTypes) => {
    let alias = "CartProduct";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "CartsProducts",
        timestamps: false
    }
    
    const CartProduct = sequelize.define(alias, cols, config)
    return CartProduct;
}