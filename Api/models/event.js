const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    interests: {
        type: [Number],
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        default: []
    },
    eventName: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    },
    location: {
        type: String,
    },
    organizerId: {
        type: String,
    },
    images: {
        type: [String],
        default: [],
    },
    eventDuration: {
        type: Number,
    },
    StartDateAndTime: {
        type: Date
    },
    EndDateAndTime: {
        type: Date
    },
    capacity: {
        type: Number
    },
    participantIds: {
        type: Array,
        default: [],
    },
    ratings: {
        type: Number
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

const status = {
    Active: 1,
    Cancelled: 2,
    Completed: 3
};

module.exports = mongoose.model("Event", eventSchema);