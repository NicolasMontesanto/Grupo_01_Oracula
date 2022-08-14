
module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategory";
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
    }
    let config = {
        tableName: "Subcategories",
        timestamps: false
    }
    

    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = function(models){
        Subcategory.hasMany(models.Attribute, {
            as: 'attribute',
            foreignKey: 'subcategoryID',
        })   
        Subcategory.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'subcategoryID',
        })   

        Subcategory.belongsTo(models.Category, {
            as: 'category'
        })   
    }
    return Subcategory;
}