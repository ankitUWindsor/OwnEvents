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
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
    },
    images: {
        type: Array,
        default: []
    },
    userType: {
        type: String,
        enum: ["ORGANIZERS", "AUDIENCE"],
        default: "ORGANIZERS",
    },
    interestsCategories: {
        type: [String],
        enum: ["Online Streaming", "Ourdoor events - Workshops", "Comedy Shows", "Kids", "Performance", "Screening", "Music Shows", "Concerts", "Vaccination", "Talks", "Celebrity Wishes", "Award Shows", "Meetups", "Photography"],
    }
});

module.exports = mongoose.model('user', userSchema);
