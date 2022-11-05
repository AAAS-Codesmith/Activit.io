// Will solely be used to set up the database connection

// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config({path: path.resolve(__dirname, '../../process.env')});

// Import the database URI from the .env file
const mongoDB = process.env.MONGO_URI;

console.log('mongoDB: ', mongoDB);

// Set up mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export db
export default db;