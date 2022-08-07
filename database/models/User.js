
module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
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
        apellido: {
            type: dataTypes.STRING,
            allowNull: false,
        }, 
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        }, 
        direccion: {
            type: dataTypes.STRING,
            allowNull: false,
        }, 
        telefono: {
            type: dataTypes.STRING,
            allowNull: false,
        }, 
        imagen: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.BLOB,
            allowNull: false,
        },
        magicPass: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        esAdmin: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        createdAt: {
            type: dataTypes.DATETIME,
            allowNull: false
        }
    }
    let config = {
        tableName: "Users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config)
    return User;
}