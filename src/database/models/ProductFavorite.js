

module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsFavorites";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "ProductsFavorites",
        timestamps: false
    }
    
    const ProductFavorite = sequelize.define(alias, cols, config)
    return ProductFavorite;
}