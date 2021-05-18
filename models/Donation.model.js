const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema(
    {
        name: { type: String, required: true },   
        surname: { type: String, required: true },   
        email: { type: String, required: true },   
        postalCode: { type: String, required: true },   
        card: {
            number: {type: [String], required: true},
            dateM: {type: [String], required: true},
            dateA: {type: [String], required: true},
            CVV: {type: [String], required: true},
        },          
        organization: { type: mongoose.Types.ObjectId, ref: 'Organizations' }

    },
    { timestamps: true }
);

const Donation = mongoose.model('Donations', donationSchema);

module.exports = Donation;
