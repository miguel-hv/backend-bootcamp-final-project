const passport = require("passport");
const Cause = require('../models/Cause.model');


module.exports = {
    causeDonationPost: async (req, res, next) => {
        try {

            // const { donation, cause } = req.body;
            console.log(req.body);
            let { donation } = req.body;
            console.log('donation recibida en controller:'+donation);

            await Cause.updateOne({ name: "Incendios en Australia" },{ $inc: { raised: donation }}); 
        
            
    
            return res.status(201).json('causeDonation completed');
    
        } catch (error) {
    
            return next(error);
        }
    },
    


};
