const passport = require("passport");
const Cause = require('../models/Cause.model');


module.exports = {
    causeDonationPost: async (req, res, next) => {
        try {
            // Hacemos destructuring de los campos que recibimos de la petición POST y creamos una variable
            // con el nombre de cada campo.
            const { donation, cause } = req.body;
            /**
             * Creamos una instancia del modelo Pet. Para crearla lo hacemos con todos los campos necesarios
             * que hemos definido en nuestro modelo. Esta instancia la guardamos en la variable newPet.
             * Por lo tanto, ahora newPet tendrá métodos como .save()
             */
            //  const newPet = new Pet({ name, age, color, breed, weight, pedegree, specie, image });
            const actualDonations = await Cause.updateOne({ name: cause },{ $inc: { raised: donation }}); 
            console.log('donaciones cause: '+ actualDonations);
            // const newDonations = actualDonations + donation;
            // console.log('suma donaciones cause: '+ newDonations);

            /**
             * Ejecutando newPet.save() guardaremos en la base de datos el nuevo documento que hemos creado
             * en la variable newPet. Y creamos una variable createdPet que será igual a lo que retorne newPet.save().
             * newPet.save() retorna el documento recién creado en nuestra base de datos.
             */ 
            // const createdPet = await newPet.save();
            
            // await Cause.findOneAndUpdate();
    
            return res.status(201).json('causeDonation completed');
    
        } catch (error) {
    
            /**
             * Si se produce un error creando la instancia del modelo (newPet), guardando en base de datos o
             * en cualquier punto de nuestro servidor, enviaremos nuestro error al Error Handler.
             */
            return next(error);
        }
    },
    


};
