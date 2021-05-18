const Shelter = require('../models/Shelter.model');

const allSheltersGet = async (req, res, next) => {
    try {
        const shelters = await Shelter.find().populate('pets');
        return res.render('shelters/shelters', { shelters });
    } catch (error) {
        next(error);
    }
};

const createShelterPost = async (req, res, next) => {
    try {
        const { name, location } = req.body;

        const newShelter = new Shelter({ name, location });

        const createdShelter = await newShelter.save();

        return res.status(201).json(createdShelter);
    } catch (error) {
        next(error);
    }
};

const addPetPut = async (req, res, next) => {
    try {
        const { shelterId, petId } = req.body;

        /**
         * Usamos $push como variable de Mongo que nos permite añadir un elemento a un array.
         * Cambiamos $push por $addToSet, que no añade elementos a nuestro array si ya existían previamente
         */
        const updatedShelter = await Shelter.findByIdAndUpdate(
            shelterId,
            { $addToSet: { pets: petId } },
            // { $push: { pets: petId } },
            { new: true }
        );

        return res.status(200).json(updatedShelter);
        
    } catch(error) {
        next(error);
    }
};

const shelterByIdGet = async (req, res, next) => {

    const { id } = req.params;

    try {
        const shelter = await Shelter.findById(id).populate('pets');
        return res.render('shelters/shelter', { shelter, alumno: 'Victor' });
    } catch(error) {
        return next(error);
    }
};

const deleteShelterByIdPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Shelter.findByIdAndDelete(id);

        return res.redirect('/shelters');
    } catch(error) {
        next(error);
    }
};

module.exports = {
    allSheltersGet,
    createShelterPost,
    addPetPut,
    shelterByIdGet,
    deleteShelterByIdPost,
};