// Will solely be used to set up the database connection

// Import mongoose
const mongoose = require('mongoose');


// Set up mongoose connection
const mongoDB = "mongodb+srv://grey:codesmith@cluster0.j3rhfed.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export db
export default db;