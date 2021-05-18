const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pickupSchema = new Schema(
    {
        name: { type: String, required: true }, 
        quantiy: { type: Number, required: true }, 
    },
    { timestamps: true }
);

const Pickup = mongoose.model('Pickups', pickupSchema);

module.exports = Pickup;
