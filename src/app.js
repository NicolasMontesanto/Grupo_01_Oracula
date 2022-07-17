const express = require('express'); //requiero express
const path = require('path'); //requiero path
const session = require('express-session'); //requiero session
const methodOverride = require("method-override");
//express
let app = express(); 

//ejs 
app.set("view engine", "ejs"); 
//cambiamos la ruta x default para que contemple que views esta en src 
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//session
app.use(session({
    secret: 'Oracula secrets',
    resave: false,
    saveUninitialized: false,
}));

//configuración de method-override
app.use(methodOverride("_method"));

//rutas
const routes = require("./routers/index.routes");
app.use("/", routes);

//defino el puerto
const port = process.env.PORT || 3200;

//recursos estáticos
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));
//server
app.listen(port, ()=>{
    console.log(`Escuchando por el puerto ${port}`)
});
