// Import mongoose
import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema;

// Define Team Model
const TeamModel = new Schema({
  team_id: { type: Number, required: true },
  team_size: { type: Number, required: true },
  posts: [ {
    post_id: { type: Number, required: true },
    user: { type: String, required: true },
    content: { type: String, required: true },
  } ],
  activities: [ {
    activity: { type: String, required: true },
    activity_type: { type: String, required: true },
  } ]
})

// Compile model from schema
const Team = mongoose.model('Team', TeamModel);

// Export model
export default Team;