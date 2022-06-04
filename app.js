const express = require('express'); //requiero express
const path = require('path'); //requiero path
//express
let app = express(); 


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