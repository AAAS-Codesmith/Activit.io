// Import mongoose
import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema;

// Define Team Model
const TeamModel = new Schema({
  // Will reference Team Model from User Model via team_id
  team_id: { type: String, required: true },
  team_name: { type: String, required: true },
  team_members: [ { type: String, required: true } ],
  posts: {
    post_id: [ { type: String, required: true } ],
  },
  activities: {
    activity: [ { type: String, required: true } ],
  }
});

// Compile model from schema
const Team = mongoose.model('Team', TeamModel);

// Export model
export default Team;