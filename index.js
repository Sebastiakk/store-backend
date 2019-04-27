// Se importan todos los modulos necesarios
const express = require("express");
const body_parse = require("body-parser");
const colors = require('colors');

const {
    _403,
    _500
} = require("./app/class/class_response"); // Status code 

const app = express();

const {
    Server
} = require("./app/configs/constants"); // Se importan los datos para el servidor

const rutas = require("./app/routes"); // Se importan las rutas

app.use(body_parse.json()); // se parsea el body
app.use(
    body_parse.urlencoded({
        extended: true
    })
);

app.use((req, res, next) => { // Este middleware agrega unas cabeceras
    res.setHeader("Access-Control-Allow-Origin", "*"); // Cualquier url puede consumir la api
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"); // Solo se aceptan estos metodos
    res.setHeader("Access-Control-Allow-Headers", "*"); // Sew acepta cualquie Header
    res.setHeader("Content-Type", "application/json; charset=utf-8"); // Cotificado del body
    next(); // Despues de aplicar los Header sigue para las apis
});

rutas.forEach(element => { // Recorre y establece cara ruta del server 
    app.use(element.path, element.data);
});

app.listen(Server.puerto, () => { // inicia el servidor
    console.log(colors.green.bold(Server.mensaje()));
});