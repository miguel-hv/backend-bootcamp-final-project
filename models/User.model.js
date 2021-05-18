const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true }, // juan
        email: { type: String, required: true }, // juan@macias.com
        password: { type: String, required: true }, // 1234asd
        role: { type: String, required: true, enum: ['admin', 'user'], default: 'user'},
        donations: { type:mongoose.Types.ObjectId, ref: 'Donation' },
        contributions: { type:mongoose.Types.ObjectId, ref: 'Contribution' },
        address: { 
            street: {type: [String], required: true},
            postalCode: {type: [String], required: true}, 
            city: {type: [String], required: true}, 
                },
        card: {
            number: {type: [String], required: true},
            dateM: {type: [String], required: true},
            dateA: {type: [String], required: true},
            CVV: {type: [String], required: true},
        }
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
