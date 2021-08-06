const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: Number,
        enum: [1, 2],
        default: 1
    },
    organizerId: {
        type: String,
    },
    participantId: {
        type: String,
    },
    eventId: {
        type: String
    },
    seatCount: {
        type: Number
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    isCanceled: {
        type: Boolean,
        default: false
    }
});

const status = {
    Active: 1,
    Cancelled: 2,
    Completed: 3
};

module.exports = mongoose.model("Booking", bookingSchema);