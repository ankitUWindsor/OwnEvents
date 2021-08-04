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
    isVerified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: Number,
        enum: [1, 2],
        default: 1
    },
    interests: {
        type: [Number],
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    },
    resetLink: {
        type: String,
        default: ''

    }
});
const interestsCategories = {Online_Streaming: 1, 
    Ourdoor_events_Workshops: 2,
    Comedy_Shows: 3,
     Kids: 4,
     Performance: 5,
     Screening: 6,
     Music_Shows: 7,
     Concerts: 8,
     Vaccination: 9,
     Talks: 10,
     Celebrity_Wishes: 11,
     Award_Shows: 12,
     Meetups: 13,
     Photography: 14}
const UserType = {
    Organizer: 1,
    Audience: 2
}


module.exports = mongoose.model('user', userSchema);

