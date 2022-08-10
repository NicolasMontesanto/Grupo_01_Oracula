
module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsGenres";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: "ProductsGenres",
        timestamps: false
    }
    
    const  ProductGenre = sequelize.define(alias, cols, config)

    return ProductGenre;
}