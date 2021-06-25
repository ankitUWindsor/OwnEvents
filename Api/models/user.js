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
    userType: {
        type: Number,
        enum: [1, 2],
        default: 1
    },
    interestsCategories: {
        type: [Number],
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    }
});

module.exports = mongoose.model('user', userSchema);