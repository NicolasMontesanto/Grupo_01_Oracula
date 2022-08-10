const Attribute = require("./Attribute");
const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {
    let alias = "AttributesProducts";
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

    /*AttributeProduct.associate = function (models) {

        AttributeProduct.belongsTo(models.Product, {
            as: 'product',
            foreignKey: {
                name: 'productID',
                type: dataTypes.INTEGER,
                allowNull: false
            }
        })

        AttributeProduct.belongsTo(models.Attribute, {
            as: 'atributte',
            foreignKey: {
                name: 'atributteID',
                type: dataTypes.INTEGER,
                allowNull: false
            }
        })


    }*/

    return AttributeProduct;
}