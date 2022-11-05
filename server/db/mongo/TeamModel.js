// Import mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

// Define Team Model
const TeamModel = new Schema({
  // Will reference Team Model from User Model via team_id
  team_id: { type: String, required: true },
  team_name: { type: String, required: true },
  team_members: { type: Array, required: true },
  posts: {
    post_id: { type: Array, required: true },
  },
  activities: {
    activity: { type: Array, required: true },
  }
});

// Compile model from schema
const Team = mongoose.model('Team', TeamModel);

// Export model
module.exports = Team;