
module.exports = (sequelize, dataTypes) => {
    let alias = "Genres";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: "Genres",
        timestamps: false
    }
    
    const Genre = sequelize.define(alias, cols, config)
    return Genre;
}