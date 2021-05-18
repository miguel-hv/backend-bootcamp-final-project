const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        pets: [{ type: mongoose.Types.ObjectId, ref: 'Pets' }]
    },
    { timestamps: true }
);

const Shelter = mongoose.model('Shelters', shelterSchema);

module.exports = Shelter;