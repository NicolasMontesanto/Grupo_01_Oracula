const express = require('express'); //requiero express
const path = require('path'); //requiero path
const session = require('express-session'); //requiero session
const methodOverride = require("method-override");
const userCredentialsMiddleware = require("./middleWares/userCredentialsMiddleware");
const recordarMiddleware = require("./middleWares/recordarMiddleware"); //lo requiero para recordar usuarix en todas las pag.
const cookies = require("cookie-parser");
const cors = require('cors')


//express
let app = express(); 
//cookies
app.use(cookies());
//session
app.use(session({
    secret: 'Oracula secrets',
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());
// credenciales de usuarix
app.use(userCredentialsMiddleware);
//recordar usuarix
app.use(recordarMiddleware); 
//ejs 
app.set("view engine", "ejs"); 
//cambiamos la ruta x default para que contemple que views esta en src 
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



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
