const Category = require("./Category");
const Categorie = require("./Category");
const Subcategory = require("./Subcategory");

module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        esNovedad: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        esDestacado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        esMagicPass: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        categoryID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
            }
        },
        subcategoryID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Subcategory,
            }
        }

    }
    let config = {
        tableName: "Products",
        timestamps: true
    }
    
    const Product = sequelize.define(alias, cols, config)
    return Product;
}