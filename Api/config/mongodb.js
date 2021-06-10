const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
},
() => console.log('DB Connected'));