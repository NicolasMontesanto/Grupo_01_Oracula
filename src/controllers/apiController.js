const db = require('../database/models');

const apiController = {
    users: (req, res) => { 
        db.User.findAll()
        .then( users => { 
            let usersData = []; 
            users.forEach(user => {
                let usuarie = {
                    id: user.id,
                    name : `${user.nombre} ${user.apellido}`,
                    email: user.email,
                    detail: `http://localhost:3200/api/users/${user.id}`,
                }
                usersData.push(usuarie)
            });
            
            let usersResponse = { 
                count: users.length,
                users: usersData
            }

            return res.status(200).json(usersResponse)
        })
        .catch(error => {
            return res.status(500).json(`Ha ocurrido un error inesperado : ${error}`);
        })
         
    } 

}

module.exports = apiController; 