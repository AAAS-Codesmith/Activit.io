const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

// Define Team Model
const TeamModel = new Schema({
  // Will reference Team Model from User Model via team_id
  team_id: { type: String, required: true },
  teamName: { type: String, required: true },
  teamMembers: { type: Array, required: true },
  posts: {
    post_id: { type: Array, required: true },
  },
  teamActivities: [
    {
      activity: { type: String, required: true },
      type: {type: String, required: true },
      price: { type: Number, required: true },
      participants: { type: Number, required: true },
    },
  ]
});

// Compile model from schema
const Team = mongoose.model('Team', TeamModel);

// Export model
module.exports = Team;
