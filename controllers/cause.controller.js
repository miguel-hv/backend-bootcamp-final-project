const passport = require("passport");
const Cause = require('../models/Cause.model');


module.exports = {
    causeDonationPost: async (req, res, next) => {
        try {

            // const { donation, cause } = req.body;
            console.log(req.body);
            let { donation } = req.body;
            console.log('donation recibida en controller:'+donation);
            donation = 999;

            //  const newPet = new Pet({ name, age, color, breed, weight, pedegree, specie, image });
            // const actualDonations = await Cause.updateOne({ name: cause },{ $inc: { raised: donation }}); 
            const actualDonations = await Cause.updateOne({ name: "Incendios en Australia" },{ $inc: { raised: donation }}); 
            console.log('donaciones cause: '+ actualDonations);
            // const newDonations = actualDonations + donation;
            // console.log('suma donaciones cause: '+ newDonations);

            // const createdPet = await newPet.save();
            
            // await Cause.findOneAndUpdate();
            
    
            return res.status(201).json('causeDonation completed');
    
        } catch (error) {
    
            return next(error);
        }
    },
    


};
