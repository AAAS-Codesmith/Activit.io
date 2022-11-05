const dbController = {};
const Team = require('../db/mongo/TeamModel.js');
const User = require('../db/mongo/UserModel.js');
const mongoose = require('mongoose');
const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../process.env')});
const saltRounds = process.env.SALT_ROUNDS || 10;

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
// POST Controllers ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Verify user
dbController.verifyUser = async (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.verifyUser called ', 'color: #00ff00');

  // Pull out the username and password from the request body
  const { username, password } = req.body;

  // Find the user in the database
  User.findOne({username}, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.verifyUser: ${err}`,
        message: { err: 'Error occurred in dbController.verifyUser. Check server logs for more details.' },
      });
    }
    // Log to let us know the user was found
    console.log(`%c User found in database: ${user} `, 'color: #00ff00');

    // Check if the password matches the one in the database
    bcrypt.compare(password, user.password, (err, result) => {
      // Error handling
      if (err) {
        return next({
          log: `Error in dbController.verifyUser: ${err}`,
          message: { err: 'Error occurred in dbController.verifyUser. Check server logs for more details.' },
        });
      }
      // Log to let us know the password was verified
      console.log(`%c Password verified `, 'color: #00ff00');

      // Save the user info to res.locals
      res.locals.user_info = user;

      // Move to the next middleware
      return next();
    });
  });
};

// Create a new User
dbController.createUser = async (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.createUser called ', 'color: #00ff00');

  // Pull out the user info from the request body
  const { username, password } = req.body;
  console.log("Received username: " + username + " and password: " + password);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
  console.log(typeof hashedPassword);

  // Generate a random userID for the new user
  const randomAlphanumeric = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Create a new user object
  console.log('creating user');
  User.create({
    user_id: randomAlphanumeric,
    username,
    password: hashedPassword,
    teams: {} 
  })
    .then((user) => {
      // Log to let us know the user was saved
      console.log('%c User saved to database ', 'color: #00ff00');
      // Move to the next middleware
      return next();
    })
    .catch((err) => {
      // Error handling
      console.error('Error saving user to database');
      console.error(err);
      return next({
        log: 'ERROR in createUser MW',
        status: 400,
        message: 'Error Occurred'
      });
    });
};

// Create a new team
dbController.createTeam = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.createTeam called ', 'color: #00ff00');

  // Pull out the team info from the request body
  const { team_name, members } = req.body;

  // Generate a random teamID for the new team
  const randomAlphanumeric = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Create a new team object
  Team.create({
    team_id: randomAlphanumeric,
    team_name,
    team_members: [members],
    posts: {},
    activities: {}
  })
    .then((team) => {
      // Log to let us know the team was saved
      console.log('%c Team saved to database ', 'color: #00ff00');
      res.locals.team_info = team;
      // Move to the next middleware
      return next();
    })
    .catch((err) => {
      // Error handling
      console.error(err);
      return next({
        log: 'ERROR in createTeam MW',
        status: 400,
        message: 'Error Occurred'
      });
    })
};

// Update a user's information
dbController.updateUser = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log('%c dbController.updateUser called ', 'color: #00ff00');

  // Pull out the team_id and name from res.locals.team_info
  console.log(res.locals.team_info.team_id);
  const team_id = res.locals.team_info.team_id;
  const { team_name } = res.locals.team_info;

  // Pull out the user_id from the request body
  const { user_id } = req.body.user_id;

  // Find the user in the DB and insert the team_id into the teams object
  User.findOneAndUpdate(user_id, { $set: { [`teams.${team_id}`]: team_name } })
    .then((user) => {
      // Log to let us know the user was updated
      console.log(`%c User updated in database with return of : ${user}`, 'color: #00ff00');
      res.locals.user_info = user;
      return next();
    })
    .catch((err) => {
      // Error handling
      console.error(err);
      return next({
        log: 'ERROR in updateUser MW',
        status: 400,
        message: 'Error Occurred'
      })
    })
};


module.exports = dbController;