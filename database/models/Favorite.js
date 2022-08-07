const User = require("./User");

module.exports = (sequelize, dataTypes) => {
    let alias = "Favorites";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
            }
        }
    }
    let config = {
        tableName: "Favorites",
        timestamps: false
    }
    
    const Favorite = sequelize.define(alias, cols, config)
    return Favorite;
}