const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const cors = require('cors')

dotenv.config({path: 'env'});
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const models = path.join(__dirname, 'models');
fs.readdirSync(models).forEach(file => require(path.join(models, file)));

const models = path.join(__dirname, 'models');
fs.readdirSync(models).forEach(file => require(path.join(models, file)));


require('./config/mongodb');

app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/user', authRouter);

app.listen(3000, () => console.log('server up and running'));

/***********************************
 * Mongoose Configurations
 * *********************************/
 mongoose.Promise = global.Promise;

 mongoose.connection.on('connected', () => {
     console.info('DATABASE - Connected');
 });
 
 mongoose.connection.on('error', err => {
     console.error('DATABASE - Error');
     console.error(err.message || err);
 });
 
 mongoose.connection.on('disconnected', () => {
     console.warn('DATABASE - disconnected  Retrying....');
 });
 
 let connectDb = function () {
     const dbOptions = {
         poolSize: 5,
         reconnectTries: Number.MAX_SAFE_INTEGER,
         reconnectInterval: 500,
         useNewUrlParser: true,
         useFindAndModify: false,
     };
     mongoose.connect(process.env.DB_CONNECT, dbOptions).catch(err => {
         console.error('DATABASE - Error');
         console.error(err);
     });
 };
 connectDb();