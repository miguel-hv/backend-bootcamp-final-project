const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'Users' }, 
        email: { type: String, required: true },
        organization: { type: mongoose.Types.ObjectId, ref: 'Organizations' }

    },
    { timestamps: true }
);

const Donation = mongoose.model('Donations', donationSchema);

module.exports = Donation;
