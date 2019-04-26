const express = require("express");
const body_parse = require("body-parser");
const colors = require('colors');

const {
    _403,
    _500
} = require("./app/class/class_response");

const app = express();

const {
    Server
} = require("./app/configs/constants");

const rutas = require("./app/routes");

app.use(body_parse.json());
app.use(
    body_parse.urlencoded({
        extended: true
    })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use((req, res, next) => {
    try {
        const key = req.headers.key;
        // if (!key) {
        //     return res.json(_403("KEY INVALID"));
        // } else {
            next();
        // }
    } catch (error) {
        return res.json(_500("INTERNAL SERVER ERROR"));
    }
});

rutas.forEach(element => {
    app.use(element.path, element.data);
});

app.listen(Server.puerto, () => {
    console.log(colors.green.bold(Server.mensaje()));
});