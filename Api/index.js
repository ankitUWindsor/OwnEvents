const express = require('express');
const app = express();
const dotenv = require('dotenv');

const cors = require('cors')

dotenv.config({path: 'env'});
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

require('./config/mongodb');

app.use(cors(corsOptions))

app.use(express.json());

app.listen(3000, () => console.log('server up and running'));