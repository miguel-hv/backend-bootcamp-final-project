const express = require ('express');
const path = require("path");
const session = require ("express-session");
const passport = require ("passport");
const db = require("./db.js");
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
require("./authentication");



db.connect();

const PORT = 3500;

const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

const server = express();



server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.use(
    session({
        secret: '3qu1pAz0!+R3cl1cLad0r',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 15 * 24 * 60 * 60 * 1000,
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

server.use(passport.initialize());

server.use(passport.session());

server.use("/", indexRoutes);
server.use("/auth", authRoutes);

server.use("*", (req, res) => {
    const error = new Error("Ruta no encontrada, aqui no hay nada que reciclar");
    error.status = 404;
    return res.status(404).json(error.message);
});

server.use((error, req, res, next) => {
    console.log("Error handler", error);
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Unexpected Error";
    return res.status(errorStatus).json(errorMessage);
});

server.listen(PORT, () => {

    console.log(`Servidor de reciclaje, reciclando a tope de power en http://localhost:${PORT}`)
});