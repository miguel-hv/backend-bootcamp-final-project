const passport = require("passport");
const Cause = require('../models/Cause.model');
const User = require('../models/User.model');


module.exports = {

    causesGet: async (req, res, next) => {

        try {
            const causes = await Cause.find();
            
            return res.json(causes);
        } catch(error) {
            console.log('error causesGet', error);
            return next(error);
        }
    },

    causeDonationPost: async (req, res, next) => {
        try {

            // const { donation, cause } = req.body;
            console.log(req.body);
            let { cause, donation } = req.body;
            console.log('donation recibida en controller:'+donation);
            console.log('cause recibida en controller:'+cause);
            
            await Cause.updateOne({ name: cause},{ $inc: { raised: donation }}); 
            // causeId = await Cause.findAndModify({query: { name: cause }, update: { $inc: { raised: donation }}}); 
            // causeId = Cause.find({ name: cause }, { id_:1 }); 
            // user = "musico@upgrade.com";
            // await User.updateOne({ email: user },{ causeId });

            // usuario = await User.findAndModify({
            //     query: { name: cause }, 
            //     update:{ $push: { donations: { causeId, donation }}}
            // });
    
            return res.status(201).json('causeDonation completed');
    
        } catch (error) {
    
            return next(error);
        }
    },
    


};
