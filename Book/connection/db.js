const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../Gateway/.env') });

mongoose.connect(process.env.MONGOOSE_CONNECTION_DB2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connection established successfully for DB2');
});

mongoose.connection.on('error', () => {
    console.log('Mongoose connection default error');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Connection close successfully');
        process.exit(0);
    });
});