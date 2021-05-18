
const sheltersArray = [
    {
        name: 'Pepe',
        location: 'Howarts Colegio',
        pets: [],
    },
    {},
    {},
];

mongoose.connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log('Ejecutando seed Shelter.js');
        const allPets = await Pets.find();

        if(allShelters.length) {
            await Shelters.collection.drop();
            console.log('Colección Shelters eliminada con éxito');
        }
    })
    .catch(error => {
        console.log('Error buscando en DB:', error);
    })
    .then(async () => {
        /**
         * Aquí tendremos que modificar el array de id de Pets dentro de nuestro Seed y añadirle
         * las ID's de Pets.
         */

        const allPets = Pet.find();
        sheltersArray[0].pets = [allPets[0]._id, allPets[1]._id];
        sheltersArray[1].pets = [allPets[2]._id, allPets[3]._id];


        await Shelters.insertMany(sheltersArray);
        console.log('Añadidos nuevas Shelters a DB');
    })
    .catch((error) => {
        console.log('Error insertando Shelters', error);
    })
    .finally(() => {
        mongoose.disconnect()
    });