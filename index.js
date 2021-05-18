// Nos traemos a Express desde node_modules para tenerlo disponible.
const express = require("express");
const path = require("path");
const hbs = require('hbs');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const dotenv = require('dotenv');
dotenv.config();

const { isAuthenticated } = require('./middlewares/auth.middleware');

// T- Guarda en la constante indexRoutes la exportación de la ruta indicada en require.
// traemos el index.routes a nuestro archivo index.js
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const petsRoutes = require("./routes/pets.routes");
const sheltersRoutes = require("./routes/shelters.routes");

// T- Guarda en la constante db, lo que exportamos en este archivo.
const db = require("./db.js");

require("./authentication");

// Creamos el puerto para nuestro servidor
const PORT = process.env.PORT || 3000;

// Ejecuta la función connect definida dentro de db.js, puedo ejecutarla porque la he requerido.
db.connect();

// T- Creamos una instancia resultante de ejecutar express.
// creamos nuestro servidor
const server = express();

server.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 15 * 24 * 60 * 60 * 1000,
        },
        store: MongoStore.create({ mongoUrl: db.DB_URL }),
    })
);
// next()

// inicializar passport
server.use(passport.initialize());
// next();
server.use(passport.session()); // añade req.user a nuestro objeto request
// next();

/**
 * req.body
 * req.params
 * req.query
 * req.user
 */

// Middleware de ejemplo
// server.use((req, res, next) => {
//     req.manuel = "Hola, me llamo Manuel";
//     req.lore = [1,2,3,4,5];
//     next();
// });

// Configuramos la ubicación de la carpeta desde la raiz del disco.
server.set('views', path.join(__dirname, 'views'));
// next()
server.set('view engine', 'hbs');
// next();

hbs.registerHelper('mayorque', (a, b, options) => {
    if (a > b) {
        return options.fn(this);
    } else {
        options.inverse(this);
    }
});

hbs.registerHelper('mayus', (string) => {
    return string.toUpperCase();
});

// carpeta de estáticos
server.use(express.static(path.join(__dirname, 'public')));
// next()

// Cuando recibo una petición POST en formato JSON, esta línea transforma los datos que recibe
// y los añade al objeto req.body
server.use(express.json());
// next()

// Cuando recibo una petición POST en formato Formulario, esta línea transforma los datos que recibe
// a un objeto que luego añade al objeto req.body
server.use(express.urlencoded({ extended: true }));

// http://localhost:3000/pepito/add-pet

// función que nos da express, podemos configurar una ruta y asociarla a un router (requerido previamente)
server.use("/", indexRoutes);
server.use("/auth", authRoutes);
server.use("/pets", petsRoutes);
// hay match con /shelters, primero ejecuta el middleware y cuando
// el middleware hace next(), pasaría a buscar la ruta restante para match
server.use("/shelters", isAuthenticated, sheltersRoutes);

// configuramos una ruta con el símbolo *, cualquier ruta hará match con *.
// Si una ruta hace match, quiere decir que no ha hecho match previamente, por lo tanto
// es una ruta que no tenemos configurada en nuestra aplicación.
server.use("*", (req, res) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return res.status(404).json(error.message);
});

// middleware de errores. Será la próxima función que se ejecuta, después de las rutas.
// por lo tanto, si una ruta pasa al siguiente paso (next), entrará por esta función.
// Es la única función que recibe un error en el primer argumento, ninguna otra puede recibirlo.
server.use((error, req, res, next) => {
    console.log("Error Handler", error);
    const errorStatus = error.status || 500;
    const errorMsg = error.message || "Unexpected Error";
    return res.render('error-view', { status: errorStatus, message: errorMsg });
});

// Creamos nuestro servidor de express pasándole un puerto y ejecuta un callback
server.listen(PORT, () => {
    console.log(
        `Servidor funcionando a máxima potencia en http://localhost:${PORT}`
    );
});
