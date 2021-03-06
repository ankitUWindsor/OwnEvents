const router = require('express').Router();
const verifytoken = require('../middleware/verifytoken');
const booking = require('../models/booking');
const Event = require('../models/event');
const User = require('../models/user');
const Booking = require('../models/booking');
const eventController = require('./eventController');
const mailer = require('./../services/mailerService');

router.post('/create', verifytoken, async (req, res) => {
    try {
        const event = await Event.findOne({
            _id: req.body.eventId
        });

        const foundAt = event.participantIds.findIndex((item) => item === req.user._id);

        if (foundAt !== -1) {
            res.status(200).send({
                success: 409,
                message: 'Booking already Exists'
            });
        } else {
            for (let i = 0; i < req.body.seatCount; i++) {
                event.participantIds.push(req.user._id);
            }
            await event.save();

            const booking = new Booking({
                name: req.body.name,
                email: req.body.email,
                status: 1,
                participantId: req.user._id,
                organizerId: event.organizerId,
                eventId: req.body.eventId,
                seatCount: req.body.seatCount
            });

            await booking.save();

            const organizer = await User.findOne({
                _id: event.organizerId
            });
            let mailOptions = {
                to: booking.email,
                subject: 'Booking Confirmation:' + booking._id,
                body: `
                <h1>Your Booking has been confirmed for EVENT <b>"${event.eventName}"</b></h1>
                <p><b>Number of Seats:</b> ${booking.seatCount}</p>
                <p>The event has been organized by <b>${organizer.name}</b>, Contact Email: <b>${organizer.email}</b></p>
                `
            }
            if (event.location && event.location.address) {
                mailOptions.body += `<p><b>Location:</b> ${event.location.address}</p>`;
            }

            mailer.sendMail(mailOptions);

            res.status(200).send({
                success: 200,
                result: await GetCompleteBookingInfo(booking),
                message: 'Booking is Completed'
            });
        }

    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/update', verifytoken, async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.body.id
        });
        if (!booking) {
            res.status(200).send({
                success: 404,
                message: 'Booking does not Exist'
            });
        }

        booking.name = req.body.name;
        booking.status = req.body.status;
        booking.email = req.body.email;


        if (req.body.seatCount !== booking.seatCount) {
            const event = await Event.findOne({
                _id: req.body.eventId
            });
            for (let i = event.participantIds.length - 1; i >= 0; i--) {
                if (booking.participantId === event.participantIds[i]) {
                    event.participantIds.splice(i, 1);
                }
            }
            for (let i = 0; i < req.body.seatCount; i++) {
                event.participantIds.push(booking.participantId);
            }
            await event.save();
        }

        booking.seatCount = req.body.seatCount;

        await booking.save();

        res.status(200).send({
            success: 200,
            message: 'Booking updated Successfully',
            result: await GetCompleteBookingInfo(booking)
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/list', verifytoken, async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user._id
        });

        bookings = [];
        if (user.userType === 1) {
            bookings = await Booking.find({
                organizerId: req.user._id
            });
        } else {
            bookings = await Booking.find({
                participantId: req.user._id
            });
        }
        toReturnBookings = [];
        for (let i = 0; i < bookings.length; i++) {
            toReturnBookings.push(await GetCompleteBookingInfo(bookings[i]));
        }

        res.status(200).send({
            result: toReturnBookings
        });
    } catch (err) {
        res.status(400).send(err);
    }

});
    


router.get('/listByEventId/:eventId', verifytoken, async (req, res) => {
    try {
        const bookings = await Booking.find({
            eventId: req.params.eventId
        });

        toReturnBookings = [];
        for (let i = 0; i < bookings.length; i++) {
            toReturnBookings.push(GetBasicBookingInfo(bookings[i]));
            toReturnBookings[i].organizer
        }

        res.status(200).send({
            result: toReturnBookings
        });

    } catch (err) {
        res.status(400).send(err);
    }
})



router.delete('/cancel', verifytoken, async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.query.id
        });
        booking.isCanceled = true;
        await booking.save();

        const event = await Event.findOne({
            _id: booking.eventId
        });
        for (let i = event.participantIds.length - 1; i >= 0; i--) {
            if (booking.participantId === event.participantIds[i]) {
                event.participantIds.splice(i, 1);
            }
        }
        await event.save();

        res.status(200).send({
            success: 200,
            message: 'Booking is Cancelled',
            result: await GetCompleteBookingInfo(booking)
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

async function GetCompleteBookingInfo(booking) {
    const event = await Event.findOne({
        _id: booking.eventId
    });
    const user = await User.findOne({
        _id: booking.organizerId
    });

    let toReturnBooking = GetBasicBookingInfo(booking);
    toReturnBooking.event = {
        startDateAndTime: event.startDateAndTime,
        endDateAndTime: event.endDateAndTime,
        capacity: event.capacity,
        eventName: event.eventName,
        eventImages: event.images,
        eventStartDateAndTime: event.startDateAndTime,
        eventEndDateAndTime: event.endDateAndTime,
        interests: event.interests,
        location: event.location,
        arModel: event.arModel,
        ticketPrice: event.ticketPrice,
    }
    toReturnBooking.organizer = {
        name: user.name,
        email: user.email
    }

    return toReturnBooking;
}



function GetBasicBookingInfo(booking) {
    return {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        status: 1,
        organizerId: booking.organizerId,
        eventId: booking.eventId,
        seatCount: booking.seatCount,
        participantId: booking.participantId,
        isCanceled: booking.isCanceled,
        createdDate: booking.createdDate,
        event: {},
        organizer: {}
    };
}


module.exports = router;