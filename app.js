const express = require('express'); //requiero express
const path = require('path'); //requiero path
//express
let app = express(); 

//ejs 
app.set("view engine", "ejs"); 
//cambiamos la ruta x default para que contemple que views esta en src 
app.set('views', __dirname + '/src/views')

//rutas
const routes = require("./routers/index.routes");
app.use("/", routes);

//defino el puerto
const port = process.env.PORT || 3200;

//recursos estáticos
const publicPath = path.join(__dirname,'./public');
app.use(express.static(publicPath));
//server
app.listen(port, ()=>{
    console.log(`Escuchando por el puerto ${port}`)
});
