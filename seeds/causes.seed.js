const mongoose = require('mongoose');
const Cause = require('../models/Cause.model');
const { DB_URL, DB_CONFIG } = require('../db');


const causesArray = [
    {
        name: 'Incendios en Australia', 
        description: 'Australia en llamas: una catástrofe para la salud, la economía y la biodiversidad',
        image: 'https://media.gettyimages.com/photos/heatstressed-koala-waits-as-a-resident-pours-water-on-its-back-on-19-picture-id501951338?s=612x612', 
        info: 'url externa o string',   //HACER url o string JUAN
        raised: 5,   
        goal: '2000',
    },
    // {},         //HACER: meter más causas
    // {}
];


mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed Cause.js');

        const allCauses = await Cause.find();

        if(allCauses.length) {
            await Cause.collection.drop();
            console.log('Colección Causes eliminada con éxito');
        }
    })
    .catch(error => {

        console.log('Error buscando en DB:', error);
    })
    .then(async () => {

        await Cause.insertMany(causesArray);
        console.log('Añadidas nuevas Causes a DB');

    })
    .catch((error) => {

        console.log('Error insertando Cause', error)
    })
    .finally(() => {

        mongoose.disconnect()
    });
