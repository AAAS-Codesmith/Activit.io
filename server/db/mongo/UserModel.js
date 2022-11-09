const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

// Define Team Model
const UserModel = new Schema({
  // Will plan to generate a 10 digit alphanumeric string for user_id
  // ~25 million possible combinations
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // Will plan to generate a 10 digit alphanumeric string for the team_id
  // ~25 million possible combinations
  // Will reference Team Model from User Model via team_id
  teams: { type: Object, required: false },
});

// Compile model from schema
const User = mongoose.model("User1", UserModel);

// Export model
module.exports = User;
