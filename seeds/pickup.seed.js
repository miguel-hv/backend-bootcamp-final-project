const mongoose = require('mongoose');
const Pickup = require('../models/Pickup.model');
const { DB_URL, DB_CONFIG } = require('../db');


const pickupsArray = [
    {
        name: 'papel', 
        quantiy: 5, 
    },
    {
        name: 'aceite', 
        quantiy: 7, 
    },
    {
        name: 'pilas', 
        quantiy: 2, 
    }
];


mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed Pickup.js');

        const allPickups = await Pickup.find();

        if(allPickups.length) {
            await Pickup.collection.drop();
            console.log('Colección Pickups eliminada con éxito');
        }
    })
    .catch(error => {

        console.log('Error buscando en DB:', error);
    })
    .then(async () => {

        await Pickup.insertMany(pickupsArray);
        console.log('Añadidas nuevas Pickups a DB');
    })
    .catch((error) => {

        console.log('Error insertando Pickup', error)
    })
    .finally(() => {

        mongoose.disconnect()
    });
