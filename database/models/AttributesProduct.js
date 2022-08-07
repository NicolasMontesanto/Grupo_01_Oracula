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
        },
        atributteID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Attribute,
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
        tableName: "AttributesProducts",
        timestamps: false
    }
    
    const AttributeProduct = sequelize.define(alias, cols, config)
    return AttributeProduct;
}