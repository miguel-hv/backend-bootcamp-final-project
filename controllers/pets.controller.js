/**
 * Importamos el modelo de mongoose, 'Pet' para poder trabajar con el.
 */
const Pet = require('../models/Pet.model');

const petsGet = async (req, res, next) => {
    try {
        const pets = await Pet.find();
        
        return res.render('pets/pets', {pets: pets})
    } catch(error) {
        console.log('error', error);
        return next(error);
    }
};

const createPetGet = (req, res, next) => {
    return res.render('pets/create');
};

const createPetPost = async (req, res, next) => {
    try {
        // Hacemos destructuring de los campos que recibimos de la petición POST y creamos una variable
        // con el nombre de cada campo.
        const { name, age, color, breed, weight, pedegree, specie } = req.body;

        const image = req.image_url ? req.image_url : 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59bbb29c5bafe878503c9872/husky-siberiano-bosque.jpg'

        /**
         * Creamos una instancia del modelo Pet. Para crearla lo hacemos con todos los campos necesarios
         * que hemos definido en nuestro modelo. Esta instancia la guardamos en la variable newPet.
         * Por lo tanto, ahora newPet tendrá métodos como .save()
         */
        const newPet = new Pet({ name, age, color, breed, weight, pedegree, specie, image });

        /**
         * Ejecutando newPet.save() guardaremos en la base de datos el nuevo documento que hemos creado
         * en la variable newPet. Y creamos una variable createdPet que será igual a lo que retorne newPet.save().
         * newPet.save() retorna el documento recién creado en nuestra base de datos.
         */ 
        const createdPet = await newPet.save();

        return res.render('pets/pet', { pet: createdPet })

    } catch (error) {

        /**
         * Si se produce un error creando la instancia del modelo (newPet), guardando en base de datos o
         * en cualquier punto de nuestro servidor, enviaremos nuestro error al Error Handler.
         */
        return next(error);
    }
};

const petEditPut = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        
        /**
         * Primer argumento: ID del documento que queremos editar
         * Segundo argumento: Campos que queremos editar
         * Tercer argumento: guardará en editedPet el Pet después de ser editado. De no incuirlo, guardará
         *      el documento antes de ser editado.
         */
        const editedPet = await Pet.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        return res.status(200).json(editedPet);
        
    } catch (error) {
        return next(error);
    }
};

const petByIdGet = async (req, res, next) => {

    /**
     * Usamos Route Params, parámetros de ruta.
     * Es decir, en la petición http://localhost:3000/pets/123456
     * '123456' será nuestro Route Param que llamamos id (en la ruta) y extramos de req.params con
     * el mismo nombre.
     */
    const { id } = req.params;

    try {
        const pet = await Pet.findById(id);
        return res.render('pets/pet', { pet });
    } catch(error) {
        return next(error);
    }
};

const deleteByIdPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Pet.findByIdAndDelete(id);

        return res.redirect('/pets');
    } catch(error) {
        next(error);
    }
};

const petsByTypeGet = async (req, res, next) => {
    const { tipo } = req.params;

    try {
        const petsBySpecies = await Pet.find({ specie: tipo }); // { specie: 'grillo' }
        return res.status(200).json(petsBySpecies);
    } catch(error) {
        console.log('error: ', error);
        return next(error);
    }
};

const petsByAgeGet = async (req, res) => {
    const { edad } = req.params;

    try {
        const petsByAge = await Pet.find({ age: { $gte: edad } });
        return res.status(200).json(petsByAge);
    } catch(error) {
        console.log('error', error);
        error.status = 418;
        return next(error);
    }
};

module.exports = {
    petsGet,
    createPetGet,
    createPetPost,
    petEditPut,
    petByIdGet,
    deleteByIdPost,
    petsByTypeGet,
    petsByAgeGet,
}