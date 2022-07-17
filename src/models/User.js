const path = require('path');
const fs = require('fs');
const users = require ('../data/users.json')
const usersDir = path.join(__dirname, "../data/users.json")


const User = {

    getData: function() {
        return users;
    },

    findAll: function() {
        return this.getData()
    },

    findByPK: function (id) {
        let allUsers = this.getData(); 
        let userFound  = allUsers.find(unUsuario => unUsuario.id === id); 
        return userFound; 
    },

    findFirstByField: function (field, text) {
        let allUsers = this.getData(); 
        let userFound  = allUsers.find(unUsuario => unUsuario[field] === text); 
        return userFound; 
    },

    createID: function () {
        let ultimoUsuario = users[users.length-1];
        let id = ultimoUsuario?ultimoUsuario.id+1 : 1;
        return id;
    },

    create: (userData)=>{
        let newUser = {
            id : User.createID(),
            ...userData
        }
        users.push(newUser);
        let usersJSON = JSON.stringify(users, null, 4);
        fs.writeFileSync(usersDir, usersJSON, "utf-8");
        return newUser;
    },
    delete: (id) =>{
        let finalUsers = users.filter((user) => user.id != id);
        let usersJSON = JSON.stringify(finalUsers, null, 4);
        fs.writeFileSync(usersDir, usersJSON, "utf-8");
        return true;
    }    
    
}

module.exports = User;

