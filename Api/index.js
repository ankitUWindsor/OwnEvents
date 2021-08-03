const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/userController');
const eventRouter = require('./routes/eventController');
const imageRouter = require('./routes/imageController');
const bookingRouter = require('./routes/bookingController');
const scheduleService = require('./services/scheduleService');

const cors = require('cors')

dotenv.config({path: 'env'});
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

require('./config/mongodb');

scheduleService.RunScriptForEvents();

app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/user', authRouter);

app.use('/api/userInfo', userRouter);

app.use('/api/event', eventRouter);

app.use('/api/booking', bookingRouter);

app.use('/api/images', imageRouter);

app.listen(process.env.PORT, () => console.log('server up and running'));