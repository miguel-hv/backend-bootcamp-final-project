const express = require ('express');
const passport = require("passport");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const authRoutes = require("./routes/auth.routes");

const db = require("./db.js");

require("./authentication");

db.connect();

const PORT = 3000;
const server = express();
const router = express.Router();

server.use(
    session({
      secret: '1As1.!+??ASzxcj12"!.as',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false,
        sameSite: false,
      },
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  
  

server.use(passport.initialize());
server.use(passport.session());


server.use(express.json());
// server.use(express.urlencoded({ extended: true }));


router.get('/', (req, res) =>{

    console.log('Pidiendo cosas al servidor');
    res.send('Ruta de pedidos a home');
});

router.get('/auth/login', (req, res) =>{

    console.log('ruta login');
    res.send('Ruta formulario login');
});


server.use('/auth', authRoutes);

server.use('/', router);

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