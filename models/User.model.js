const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true }, 
        email: { type: String, required: true },
        password: { type: String, required: true },
        image: {type: String}, 
        role: { type: String, required: true, enum: ['admin', 'user'], default: 'user'},
        // donations: [{{ type:mongoose.Types.ObjectId, ref: 'Donation' }, {type: Number}}],
        donations: [{ type:mongoose.Types.ObjectId, ref: 'Donation' }],
        contributions: [{ type:mongoose.Types.ObjectId, ref: 'Contribution' }, {type: Number}],
        address: [{ 
            street: {type: String},
            postalCode: {type: String}, 
            city: {type: String}, 
                }],
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;