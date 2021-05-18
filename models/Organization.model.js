const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        name: { type: String, required: true }, 
        description: { type: String, required: true },
        image: { type: String, required: true }, 
        type: { type: String, required: true },     
    },
    { timestamps: true }
);

const Organization = mongoose.model('Organizations', organizationSchema);

module.exports = Organization;
