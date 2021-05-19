const mongoose = require('mongoose');
const DB_URL =  'mongodb://localhost:27017/r-ciclo';

const DB_CONFIG = {
    useNewParser: true,
    useUnifiedTopology: true,
};

const connect = () => {
    mongoose.connect(DB_URL, DB_CONFIG)
        .then((res) => {
            const { name, host } = res.connection;
    
            console.log(`Conectado con éxito a ${name} - ${host}`);
        })
        .catch(error => {
            console.log('Error conectando a la DB', error);
        });

};


module.exports = { DB_URL, DB_CONFIG, connect };
