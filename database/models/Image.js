
module.exports = (sequelize, dataTypes) => {
    let alias = "Images";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        productID: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
            }
        }
    }
    let config = {
        tableName: "Images",
        timestamps: false
    }
    
    const Image = sequelize.define(alias, cols, config);

    
    Image.associate = function(models){
    Image.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
            name: 'userID',
            type: dataTypes.INTEGER,
            allowNull: false
        }
    })   
    }

    return Image;
}