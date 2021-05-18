// Mongoose es un intermediario entre nuestra base de datos en Mongo y nuestro servidor de Express
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Definimos en un string la url a la que conecta la base de datos. Si no existe, la crea
const DB_URL = process.env.DB_URL;

// configuración para la conexión de mongoose
const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// función que hemos creado nosotros, esa función por dentro, conecta usando a mongosoe.
const connect = () => {

    // función que nos da mongoose para conectarnos a nuestra base de datos, devuelve una promesa
    mongoose.connect(DB_URL, DB_CONFIG)
        .then((res) => {
            // si la base de datos conecta correctamente, ejecuta este then
            const { name, host } = res.connection;
    
            console.log(`Conectado con éxito a ${name} en ${host}`);
        })
        .catch(error => {
            console.log('Error conectando a la DB', error);
        });
};

module.exports = { DB_URL, DB_CONFIG, connect };