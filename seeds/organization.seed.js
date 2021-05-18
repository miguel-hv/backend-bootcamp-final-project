const mongoose = require('mongoose');
const Organization = require('../models/Organization.model');
const { DB_URL, DB_CONFIG } = require('../db');


const organizationsArray = [
    {
        name: 'Hospital de koalas Port Macquarie', 
        description: 'Atendemos koalas quemados :)',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iyAGVjAVPULa5Yl0Oq_WzNz6JY9ODb4dZgEo84zrhBT_izCrZh_me3zBHHkxngtj4zE&usqp=CAU', 
        type: 'Hospital',   
    },
    {},         //HACER: meter más organizaciones
    {}
];


mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed Organization.js');

        const allOrganizations = await Organization.find();

        if(allOrganizations.length) {
            await Organization.collection.drop();
            console.log('Colección Organizations eliminada con éxito');
        }
    })
    .catch(error => {

        console.log('Error buscando en DB:', error);
    })
    .then(async () => {

        await Organization.insertMany(organizationsArray);
        console.log('Añadidas nuevas Organizations a DB');
    })
    .catch((error) => {

        console.log('Error insertando Organization', error)
    })
    .finally(() => {

        mongoose.disconnect()
    });
