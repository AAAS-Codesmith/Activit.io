// Will solely be used to set up the database connection
// Import path module
const path = require('path');
// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config({path: path.resolve(__dirname, '../../process.env')});

// Import the database URI from the .env file
// MONGO_URI="mongodb+srv://grey:codesmith@cluster0.j3rhfed.mongodb.net/?retryWrites=true&w=majority"
const mongoDB = "mongodb+srv://grey:codesmith@cluster0.j3rhfed.mongodb.net/?retryWrites=true&w=majority";

console.log('mongoDB: ', mongoDB);

// Set up mongoose connection
mongoose.connect(mongoDB, {bufferCommands: false})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB: ', err));

mongoose.connection.on('error', err => LogError(err));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export db
module.exports = db;
