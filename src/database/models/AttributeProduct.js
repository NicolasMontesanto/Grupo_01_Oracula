module.exports = (sequelize, dataTypes) => {
    let alias = "AttributeProduct";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: "AttributesProducts",
        timestamps: false
    }

    const AttributeProduct = sequelize.define(alias, cols, config);

    return AttributeProduct;
}