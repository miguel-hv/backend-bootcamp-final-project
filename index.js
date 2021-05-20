const express = require ('express');
const path = require("path");
const session = require ("express-session");
const passport = require ("passport");
const db = require("./db.js");
//require("./authentication");


db.connect();

const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

const server = express();

server.use(
    session({
        secret: '3qu1pAz0!+R3cl1cLad0r',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 15 * 24 * 60 * 60 * 1000,
        },
        
    })
);

server.use(passport.initialize());

server.use(passport.session());

server.use(express.json());

server.use(express.urlencoded({ extended: true }));



server.use("/", indexRoutes);
//server.use("/auth", authRoutes);

server.use("*", (req, res) => {
    const error = new Error("Ruta no encontrada, aqui no hay nada que recilcar");
    error.status = 404;
    return res.status(404).json(error.message);
});

server.use((error, req, res, next) => {
    console.log("Error handler", error);
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Unexpected Error";
    return res.status(errorStatus).json(errorMessage);
});


server.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
  });

server.use((err, req, res, next) => {
console.log(err);
return res.status(err.status || 500).json(err);
});

server.listen(PORT, () => {

    console.log(`Servidor de reciclaje, reciclando a tope de power en http://localhost:${PORT}`)
});