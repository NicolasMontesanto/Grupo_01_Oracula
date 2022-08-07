
module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
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
        tableName: "Categories",
        timestamps: false
    }
    
    const Category = sequelize.define(alias, cols, config)
    return Category;
}