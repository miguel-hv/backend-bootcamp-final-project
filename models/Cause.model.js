const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const causeSchema = new Schema(
    {
        name: { type: String, required: true }, 
        description: { type: String, required: true },
        image: { type: String, required: true }, 
        info: { type: String, required: true },  
        raised:  { type: Number, required: true },
        goal:  { type: String, required: true },
    },
    { timestamps: true }
);

const Cause = mongoose.model('Causes', causeSchema);

module.exports = Cause;
