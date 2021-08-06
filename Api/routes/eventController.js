const router = require('express').Router();
const verifytoken = require('../middleware/verifytoken');
const Event = require('../models/event');
const User = require('../models/user');
const Booking = require('../models/booking')
const schedule = require('node-schedule');
const mailer = require('./../services/mailerService');
const scheduleService = require('./../services/scheduleService');



router.post('/create', verifytoken, async (req, res) => {
  try {
    const newEvent = new Event({
      interests: req.body.interests,
      eventName: req.body.eventName,
      description: req.body.description,
      status: 1,
      location: req.body.location,
      organizerId: req.user._id,
      startDateAndTime: req.body.startDateAndTime,
      endDateAndTime: req.body.endDateAndTime,
      capacity: req.body.capacity,
      images: req.body.images,
      arModel: req.body.arModel,
      ticketPrice: req.body.ticketPrice,
      participantIds: []
    })
    await newEvent.save()

    scheduleService.ScheduleReminderEmail(newEvent._id, newEvent.startDateAndTime);

    res.status(201).send({
      success: 201,
      message: 'Event added successfully',
      result: await getCompleteEventsInfo(newEvent)
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      error
    });
  }
});



router.get('/list', verifytoken, async (req, res) => {
  try {
    const event = await Event.find({
      isDelete: false
    });
    const toReturnEvents = [];
    for (let i = 0; i < event.length; i++) {
      tempEvent = await getCompleteEventsInfo(event[i])
      toReturnEvents.push(tempEvent);
    }

    res.send({
      success: 200,
      result: toReturnEvents
    })
  } catch (error) {
    res.status(400).send({
      success: 0,
      error
    });
  }
});




router.get('/eventbyid', verifytoken, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.query.id
    });
    if (event) {
      res.status(200).send({
        success: 200,
        message: 'success',
        result: await getCompleteEventsInfo(event)
      });
    } else {
      res.status(200).send({
        success: 404,
        message: 'Event not found'
      });
    }

  } catch (error) {
    res.status(400).send({
      success: 0,
      error
    });
  }
});



router.post('/update', verifytoken, async (req, res) => {
  const event = await Event.findOne({
    _id: req.body.id
  });
  if (!event) {
    res.send({
      success: 0,
      message: 'Event not defined'
    });
  }

  if (new Date(req.body.startDateAndTime).getTime() !== new Date(event.startDateAndTime).getTime()) {
    scheduleService.ScheduleReminderEmail(event._id, req.body.startDateAndTime);
  }
  const updatedEvent = {
    interests: req.body.interests,
    eventName: req.body.eventName,
    description: req.body.description,
    status: req.body.status,
    location: req.body.location,
    startDateAndTime: req.body.startDateAndTime,
    endDateAndTime: req.body.endDateAndTime,
    capacity: req.body.capacity,
    participantIds: req.body.participantIds,
    images: req.body.images,
    ticketPrice: req.body.ticketPrice,
    arModel: req.body.arModel
  }

  Event.findByIdAndUpdate(req.body.id, updatedEvent).then((result) => {
    res.send({
      success: 200,
      message: 'Event Info Updated'
    });
  })
});



router.put('/updateStatus', verifytoken, async (req, res) => {
  let status = req.body.status
  try {
    Event.findByIdAndUpdate(req.body.id, {
      status
    }).then((result) => {
      res.send({
        success: 200,
        message: 'Event status updated'
      });
    })
  } catch (error) {
    res.send({
      success: 0,
      error
    });
  }
})



router.delete('/delete', verifytoken, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.query.id
    });
    const toSendToUsers = await GetToSendToParticipants(event.participantIds);

    event.isDelete = true;
    event.participantIds = [];
    await event.save();

    bookings = await Booking.find({
      eventId: req.query.id
    });
    for (let i = 0; i < bookings.length; i++) {
      bookings[i].isCanceled = true;
      await bookings[i].save();
    }

    if (toSendToUsers && toSendToUsers.length) {
      const organizer = await User.findOne({
        _id: event.organizerId
      });
      let mailOptions = {
        to: toSendToUsers,
        subject: 'Event Cancelled: ' + event.eventName,
        body: `
      <h1>Sorry to let you know that the event:<b>"${event.eventName}"</b> has been cancelled by the organizer</h1>
      <p>The event was being organized by <b>${organizer.name}</b>, Contact Email: <b>${organizer.email}</b></p>
      `
      }
      mailer.sendMail(mailOptions);
    }

    res.status(200).send({
      success: 200,
      message: 'Event Deleted'
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      error
    });
  }
})
async function getCompleteEventsInfo(event) {
  const toReturnEvent = {
    ...JSON.parse(JSON.stringify(event))
  };
  const user = await User.findOne({
    _id: event.organizerId
  });
  toReturnEvent.organizerName = user.name;
  toReturnEvent.id = toReturnEvent._id;
  delete toReturnEvent._id;
  return toReturnEvent;
}

async function GetToSendToParticipants(participantIds) {
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
  let toSendTo = '';
  const uniqueParticipantIds = participantIds.filter(unique);
  for (let i = 0; i < uniqueParticipantIds.length; i++) {
    const user = await User.findOne({
      _id: uniqueParticipantIds[i]
    });
    toSendTo += user.email;
    if (i !== uniqueParticipantIds.length - 1) {
      toSendTo += ',';
    }
  }
  return toSendTo;
}
module.exports = router;