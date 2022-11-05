const mongoose = require('mongoose');
const dbController = {};
const Team = require('../db/mongo/TeamModel.js');
const User = require('../db/mongo/UserModel.js');

// Access DB and return requested information


///////////////////////////////////////////////////////////////////////////////
// GET Controllers ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Get a user's information
dbController.getUserInfo = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.getUserInfo called ', 'color: #00ff00');

  // Pull out the user_id from the request body
  const { user_id } = req.params;

  // Find the user in the database
  User.find({ user_id }, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.getUserInfo: ${err}`,
        message: { err: 'Error occurred in dbController.getUserInfo. Check server logs for more details.' },
      });
    }
    // Log to let us know the user was found
    console.log(`%c User found in database: ${user} `, 'color: #00ff00');

    // Save the user info to res.locals
    res.locals.user_info = user;

    // Move to the next middleware
    return next();
  });
};

// Get a team's information
dbController.getTeamInfo = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.getTeamInfo called ', 'color: #00ff00');

  // Pull out the team_id from the request body
  const { team_id } = req.params;

  // Find the team in the database
  Team.find({ team_id }, (err, team) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.getTeamInfo: ${err}`,
        message: { err: 'Error occurred in dbController.getTeamInfo. Check server logs for more details.' },
      });
    }
    // Log to let us know the team was found
    console.log(`%c Team found in database: ${team} `, 'color: #00ff00');
    // Save the team info to res.locals
    res.locals.team_info = team;
    // Move to the next middleware
    return next();
  });
};



///////////////////////////////////////////////////////////////////////////////
// PUT Controllers ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
// POST Controllers ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Create a new User
dbController.createUser = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.createUser called ', 'color: #00ff00');

  // Pull out the user info from the request body
  const { username, password } = req.body;

  // Generate a random userID for the new user
  const randomAlphanumeric = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Create a new user object
  const newUser = new User({
    username,
    password,
    user_id: randomAlphanumeric,
    teams: {},
  });

  // Save the new user to the database
  newUser.save((err, user) => {
    // Error handling
    if (err) {
      console.error('Error saving user to database');
      return next(err);
    }
    // Log to let us know the user was saved
    console.log('%c User saved to database ', 'color: #00ff00');
    // Move to the next middleware
    return next();
  });
}

// Create a new team
dbController.createTeam = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.createTeam called ', 'color: #00ff00');

  // Pull out the team info from the request body
  const { team_name, members } = req.body;

  // Generate a random teamID for the new team
  const randomAlphanumeric = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Create a new team object
  const newTeam = new Team({
    team_id: randomAlphanumeric,
    team_name,
    members,
    posts: {},
    activities: {}
  });

  // Save the new team to the database
  newTeam.save((err, team) => {
    // Error handling
    if (err) {
      console.log('Error saving team to database');
      return next(err);
    }
    // Log to let us know the team was saved
    console.log('%c Team saved to database ', 'color: #00ff00');
    // Move to the next middleware
    return next();
  });
}
