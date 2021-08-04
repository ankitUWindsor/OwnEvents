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
        type: {
            latitude: {
                type: Number
            },
            longitude: {
                type: Number
            },
            address: {
                type: String
            }
        },
        default: []
    },
    organizerId: {
        type: String,
    },
    images: {
        type: [String],
        default: [],
    },
    startDateAndTime: {
        type: Date
    },
    endDateAndTime: {
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
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isReminderSent: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Event", eventSchema);