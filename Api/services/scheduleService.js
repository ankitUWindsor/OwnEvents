const Event = require('../models/event');
const User = require('../models/user');
const mailer = require('./../services/mailerService');
const schedule = require('node-schedule');
const minutesToSubtract = 30;

function ScheduleReminderEmail(eventId, startDateAndTime) {
    const previousJob = schedule.scheduledJobs[eventId];
    if (previousJob) {
        previousJob.cancel();
    }
    const currentDate = new Date(startDateAndTime);
    const reminderDate = new Date(currentDate.getTime() - (minutesToSubtract * 60000));
    schedule.scheduleJob(eventId.toString(), reminderDate, () => {
        SendEmailReminder(eventId);
    });
}

async function SendEmailReminder(eventId) {

    const event = await Event.findOne({
        _id: eventId,
        isDelete: false
    });
    if (!event || !event.participantIds.length || event.isReminderSent) return;

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    let toSendTo = '';
    const uniqueParticipantIds = event.participantIds.filter(unique);
    for (let i = 0; i < uniqueParticipantIds.length; i++) {
        const user = await User.findOne({
            _id: uniqueParticipantIds[i]
        });
        toSendTo += user.email;
        if (i !== uniqueParticipantIds.length - 1) {
            toSendTo += ',';
        }
    }


    const organizer = await User.findOne({
        _id: event.organizerId
    });

    const mailOptions = {
        to: toSendTo,
        subject: 'Event Reminder',
        body: `
      <h2>Hi there, this is Event reminder for "${event.eventName}"</h2>
      <p>The event is scheduled in <b>30 minutes</b></p>
      <p>The event has been organized by <b>${organizer.name}</b>, Contact Email: <b>${organizer.email}</b></p>
      `
    }

    if (event.location && event.location.address) {
        mailOptions.body += `<p>Location: ${event.location.address}</p>`;
    }

    mailer.sendMail(mailOptions);

    event.isReminderSent = true;
    await event.save();
}

async function RunScriptForEvents() {
    const event = await Event.find({
        isDelete: false,
        isReminderSent: false,
    });
    event.forEach((item) => {
        ScheduleReminderEmail(item._id, item.startDateAndTime);
    });
}

module.exports = {
    ScheduleReminderEmail,
    RunScriptForEvents
}