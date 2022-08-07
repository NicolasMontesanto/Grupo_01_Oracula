const Subcategory = require("./Subcategory");

module.exports = (sequelize, dataTypes) => {
    let alias = "Attributes";
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
        unidad: {type: dataTypes.STRING},
        subcategoryID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Subcategory,
            }
        }
    }
    let config = {
        tableName: "Attributes",
        timestamps: false
    }
    
    const Attribute = sequelize.define(alias, cols, config)
    return Attribute;
}