import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema;

// Define Team Model
const UserModel = new Schema({
  // Will plan to generate a 10 digit alphanumeric string for user_id
  // ~25 million possible combinations
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  // Will plan to generate a 10 digit alphanumeric string for the team_id
  // ~25 million possible combinations
  // Will reference Team Model from User Model via team_id
  team_ids: [ String ],
});

// Compile model from schema
const User = mongoose.model('User', UserModel);

// Export model
export default User;
