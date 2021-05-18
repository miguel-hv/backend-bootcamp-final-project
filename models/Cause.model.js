const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const causeSchema = new Schema(
    {
        name: { type: String, required: true }, 
        description: { type: String, required: true },
        image: { type: String, required: true }, 
        info: { type: String, required: true },  
        types: { type:mongoose.Types.ObjectId, ref: 'Organization' },    //HACER: linkar solo el campo type de orgs 
    },
    { timestamps: true }
);

const Cause = mongoose.model('Causes', causeSchema);

module.exports = Cause;
