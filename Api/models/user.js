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
        type: number,
        enum: [1, 2],
        default: 1
    },
    interestsCategories: {
        type: [String],
        enum: ["Online Streaming", "Ourdoor events - Workshops", "Comedy Shows", "Kids", "Performance", "Screening", "Music Shows", "Concerts", "Vaccination", "Talks", "Celebrity Wishes", "Award Shows", "Meetups", "Photography"],
    }
});

module.exports = mongoose.model('user', userSchema);
