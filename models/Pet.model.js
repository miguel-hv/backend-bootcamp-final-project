const mongoose = require('mongoose');

/**
 * Un modelo es un esquema de datos que le comunicamos a mongoose,
 * Mongoose, además de entender este esquema, nos ofrece funciones para
 * poder buscar en nuestra base de datos y algunas otras. (Pet.find(), Pet.findById() ...)
 */

// importamos clase Schema que viene definida dentro de mongoose.
const Schema = mongoose.Schema;

// creamos una variable petSchema que valdrá una instancia de la clase Schema.
// aquí configuraremos todos los campos que tiene nuestro modelo y el tipo de dato que puede contener.
const petSchema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number },
        color: { type: String, required: true },
        breed: { type: String },
        weight: { type: Number },
        pedegree: { type: Boolean, required: true },
        specie: { type: String, required: true },
        image: { type: String }
    },
    // esta opción hará que se actualicen fechas de creación y modificación de nuestros documentos.
    {
        timestamp: true,
    }
);

// Creamos la constante Pet, que valdrá el return de invocar a mongoose.model.
// mongoose.model es quién nos dá los métodos .find() .findByIdAndUpdate y todos los demás.
// 'Pets' -> nombre que tendrá la colección en nuestra base de datos.
// petSchema => la instancia, (o "interfaz") siguiendo las instrucciones de esquemas de Mongoose con 
const Pet = mongoose.model('Pets', petSchema);

// exportamos la constante Pet
module.exports = Pet;