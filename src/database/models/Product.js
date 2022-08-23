module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        esNovedad: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        esDestacado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        esMagicPass: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    }
    let config = {
        tableName: "Products",
        timestamps: true
    }
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){

        Product.belongsTo(models.Category, {
            as: 'Category',
            foreignKey: {
                name: 'categoryID',
                type: dataTypes.INTEGER,
                allowNull: false
            }
        })

        Product.belongsTo(models.Subcategory, {
            as: 'subcategory',
            foreignKey: {
                name: 'subcategoryID',
                type: dataTypes.INTEGER,
                allowNull: false
            }
        })  
        
        Product.hasMany(models.Image, {
            as: 'image',
            foreignKey: 'productID',
        })      

       Product.belongsToMany(models.Cart, {
            as: 'cart',
            through: 'CartProduct',
            foreignKey: 'productID',
            otherKey: 'cartID'
        })   

        Product.belongsToMany(models.Favorite, {
            as: 'favorite',
            through: 'ProductFavorite',
            foreignKey: 'productID',
            otherKey: 'cartID'
        })   

        Product.belongsToMany(models.Attribute, {
            as: "attribute",
            through: "AttributeProduct"
        })

        Product.belongsToMany(models.Genre, {
            as: 'genre',
            through: 'ProductGenre'
        })
        
        Product.hasMany(models.PurchaseProduct, {
            as: 'purchaseProduct',
            foreignKey: 'purchaseProductID',
        })
    }
    return Product;
}