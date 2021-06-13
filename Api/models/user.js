const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
    },
    userType:{
        type: Number,
        enum: [1, 2],
        default: 1,
    }
});

const UserType = {
    Organizer: 1,
    Audience: 2
}

module.exports = mongoose.model('User', userSchema);