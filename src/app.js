const express = require('express'); //requiero express
const path = require('path'); //requiero path

//creo objeto app que ejecuta express
let app = express(); 

//defino que obtendré mis recursos estáticos desde la carpeta public
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3200;
//defino el puerto
app.listen(port, ()=>{
    console.log(`Escuchando por el puerto ${port}`)
});

//defino el home vinculandolo con un html 
const homePath = path.join(__dirname, "views/home.html")
app.get("/",(req, res)=>{
res.sendFile(homePath)

//SignUp
const signUpPath = path.join(__dirname, "views/signup.html")
app.get("/signUp",(req, res)=>{
res.sendFile(signUpPath)
})
//SignUp
const loginPath = path.join(__dirname, "views/login.html")
app.get("/login",(req, res)=>{
res.sendFile(loginPath)
})

//productDetail
const productDetailPath = path.join(__dirname, "views/productDetail.html")
app.get("/productDetail",(req, res)=>{
res.sendFile(productDetailPath)
})


