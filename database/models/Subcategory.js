const Category = require("./Category");

module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategories";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false,
        }, 
        categoryID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
            }
        }
    }
    let config = {
        tableName: "Subcategories",
        timestamps: false
    }
    
    const Subcategory = sequelize.define(alias, cols, config)
    return Subcategory;
}