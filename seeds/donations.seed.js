const mongoose = require('mongoose');
const Donation = require('../models/Donation.model');
const Organization = require('../models/Organization.model');
const { DB_URL, DB_CONFIG } = require('../db');


const donationsArray = [
    {
        name: 'Balú',   
        surname: 'Eloso',   
        email: 'lajungla@yuju.com',   
        postalCode: '65581',   
        card: {
            number: '123456789',                        //HACER: validación front tarjeta
            dateM: '03',
            dateA: '2053',
            CVV: '333',
        },          
        organization: null
    },
    // {},         //HACER: meter más donaciones
    // {}
];


mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed Donation.js');

        const allDonations = await Donation.find();

        if(allDonations.length) {
            await Donation.collection.drop();
            console.log('Colección Donations eliminada con éxito');
        }
    })
    .catch(error => {

        console.log('Error buscando en DB:', error);
    })
    .then(async () => {

        const allOrganizations = await Organization.find();
        donationsArray[0].types = [
            allOrganizations[0]._id
            // , allOrganizations[0].type
        ];

        await Donation.insertMany(donationsArray);
        console.log('Añadidos nuevas Donations a DB');
    })
    .catch((error) => {

        console.log('Error insertando Donations', error)
    })
    .finally(() => {

        mongoose.disconnect()
    });