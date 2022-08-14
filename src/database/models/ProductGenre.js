module.exports = (sequelize, dataTypes) => {
    let alias = "ProductGenre";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productID:{
            type: dataTypes.INTEGER,
            references: {
                model: "Product",
                key: "id"
            }
        },
        genreID:{
            type: dataTypes.INTEGER,
            references: {
                model: "Genre",
                key: "id"
            }
        }
    }
    let config = {
        tableName: "ProductsGenres",
        timestamps: false
    }
    
    const ProductGenre = sequelize.define(alias, cols, config);

    return ProductGenre;
}