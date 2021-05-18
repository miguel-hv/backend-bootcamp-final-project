const mongoose = require('mongoose');
const Cause = require('../models/Cause.model');
const Organization = require('../models/Organization.model');
const { DB_URL, DB_CONFIG } = require('../db');


const causesArray = [
    {
        name: 'Incendios en Australia', 
        description: 'Australia en llamas: una catástrofe para la salud, la economía y la biodiversidad',
        image: 'https://media.gettyimages.com/photos/heatstressed-koala-waits-as-a-resident-pours-water-on-its-back-on-19-picture-id501951338?s=612x612', 
        info: 'url externa o string',   //HACER url o string JUAN
        types: [],   
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

        const allOrganizations = await Organization.find();
        causesArray[0].types = [
            allOrganizations[0]._id         //HACER: usar type en vez de _id (ver abajo) 
            // ,allOrganizations[0].type    
        ];

        // causesArray[0].types = [allTypes[0]._id, allTypes[1]._id];
        // causesArray[1].types = [allTypes[2]._id, allTypes[3]._id];

        await Cause.insertMany(causesArray);
        // await Cause.populate(causesArray);       //HACER: cambiar insertMany por otro método para campos no id
        console.log('Añadidos nuevas Causes a DB');
    })
    .catch((error) => {

        console.log('Error insertando Cause', error)
    })
    .finally(() => {

        mongoose.disconnect()
    });
