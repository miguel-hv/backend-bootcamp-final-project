const mongoose = require('mongoose');
const Pet = require('../models/Pet.model');
const { DB_URL, DB_CONFIG } = require('../db');

/**
 * Un Seed es un archivo semilla para crear algunos documentos 
 * en nuestra base de datos de manera automática e inicial.
 * 
 * Al ejecutar el seed, el comportamiento esperado es que se borre nuestra colección
 * en la base de datos y se creen los elementos definidos en petsArray de manera automática
 * 
 * Hay que ejecutarlo con Node
 */

const petsArray = [
    {
        name: 'Piña',
        age: 3,
        color: 'negra',
        weight: 3,
        pedegree: false,
        specie: 'cat',
        image: 'https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2019/12/11/gatita.jpeg',
    },
    {
        name: 'Pepito Grillo',
        age: 20,
        breed: 'pura sangre',
        color: 'azulado',
        weight: 0.1,
        pedegree: true,
        specie: 'grillo',
        image: 'https://rinconpsicologia.com/wp-content/uploads/2014/01/pepegrillo.jpg',
    },
    {
        name: 'Evolet',
        age: 6,
        breed: 'Exótico Americano',
        color: 'tricolor',
        weight: 3,
        pedegree: true,
        specie: 'cat',
        image: 'http://deanimalia.com/images/full/gatos/exotico1.jpg',
    },
    {
        name: 'Mía',
        age: 6,
        breed: 'pastor aleman',
        color: 'negra',
        weight: 25,
        pedegree: false,
        specie: 'dog',
        image: 'https://www.hola.com/imagenes/estar-bien/20191004150785/pastor-aleman-raza-de-perro-caracteristicas/0-728-57/raza-de-perro-pastor-aleman-m.jpg',
    },
    {
        name: 'Lassy',
        age: 4,
        breed: 'border collie',
        color: 'marron blanca y negra',
        weight: 15,
        pedegree: true,
        specie: 'dog',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Rough_Collie_600.jpg',
    },
];

/**
 * El seed no está conectado con nuestro servidor, por lo tanto habrá que ejecutarlo
 * de manera manual con Node. Hemos configurado un script en el package.json 'npm run seed'
 * que ejecuta el comando 'node seeds/pets.seed.js'
 * 
 * El seed conecta con base de datos, elimina y crea datos y luego se desconecta
 */

mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed Pet.js');

        // 1. Buscar en base de datos por si ya existen Pets
        const allPets = await Pet.find();

        /**
         * 2. Si existen Pets, los elimino.
         */
        if(allPets.length) {
            await Pet.collection.drop();
            console.log('Colección Pets eliminada con éxito');
        }
    })
    .catch(error => {
        /**
         * Si hay un error buscando pets o eliminando, entra aquí
         */
        console.log('Error buscando en DB:', error);
    })
    .then(async () => {
        /**
         * Inserto todos los pets dentro de petsArray
         */
        await Pet.insertMany(petsArray);
        console.log('Añadidas nuevas Pets a DB');
    })
    .catch((error) => {
        /**
         * Si hay un problema insertando los nuevos pets, entro por aquí
         */
        console.log('Error insertando Pets', error)
    })
    .finally(() => {
        /**
         * Da igual que la promesa se complete por el then o salga por el catch,
         * absolutamente siempre ejecutará .finally() para cerrar la conexión a nuestra
         * base de datos. Nunca debería quedarse abierta.
         */
        mongoose.disconnect()
    });
