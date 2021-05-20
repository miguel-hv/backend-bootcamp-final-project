const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { DB_URL, DB_CONFIG } = require('../db');


const usersArray = [
    {
        name: 'Semilla', 
        email: 'semilla@girasol.com',
        password: '1234asd',            //TAREA: revisar password con requisitos entrada front
        role: 'user',
        donations: null,
        contributions: null,
        address: { 
            street: 'Alvargonzález',
            postalCode: '33538', 
            city: 'Gijón', 
                },
    }
];


mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed User.js');

        const allUsers = await User.find();
        if(allUsers.length) {
            await User.collection.drop();
            console.log('Colección Users eliminada con éxito');
        }
    })
    .catch(error => {

        console.log('Error buscando en DB:', error);
    })
    .then(async () => {

        await User.insertMany(usersArray);
        console.log('Añadidas nuevas Users a DB');
    })
    .catch((error) => {

        console.log('Error insertando User', error)
    })
    .finally(() => {

        mongoose.disconnect()
    });
