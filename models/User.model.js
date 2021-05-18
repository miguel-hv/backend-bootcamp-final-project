const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true }, // juan
        email: { type: String, required: true }, // juan@macias.com
        password: { type: String, required: true }, // 1234asd
        role: { type: String, required: true, enum: ['admin', 'user'], default: 'user'},
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;