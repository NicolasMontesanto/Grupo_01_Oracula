const PurchaseProduct = require("./PurchaseProduct");
const User = require("./User");

module.exports = (sequelize, dataTypes) => {
    let alias = "Purchases";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        montoTotal: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATETIME,
            allowNull: false
        },
        esCancelado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    }
    let config = {
        tableName: "Purchases",
        timestamps: false
    }
    
    const Purchase = sequelize.define(alias, cols, config);

    
   Purchase.associate = function(models){
        Purchase.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
            name: 'userID',
            type: dataTypes.INTEGER,
            allowNull: false
        }
        })   

       Purchase.belongsToMany(models.Product, {
            as: 'product',
            through: PurchaseProduct,
            foreignKey: 'purchaseID',
            otherKey: 'productID'
        })      


    }

    return Purchase;
}