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
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log('\u001b[1;32m dbController.getUserInfo called ');

  // Pull out the user_id from the request body
  const { user_id } = req.params;

  // Find the user in the database
  User.find({ user_id }, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.getUserInfo: ${err}`,
        message: { err: 'Error occurred in dbController.getUserInfo.' },
      });
    }
    // Log to let us know the user was found
    console.log(`\u001b[1:32m User found in database: `);
    console.group();
    console.log(user);
    console.groupEnd();

    // Save the user info to res.locals
    res.locals.user_info = user;

    // Move to the next middleware
    return next();
  });
};

// Get a team's information
dbController.getTeamInfo = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log('\u001b[1;32m dbController.getTeamInfo called ');

  // Pull out the team_id from the request body
  const { team_id } = req.params;

  // Find the team in the database
  Team.find({ team_id }, (err, team) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.getTeamInfo: ${err}`,
        message: { err: 'Error occurred in dbController.getTeamInfo.' },
      });
    }
    // Log to let us know the team was found
    console.log(`\u001b[1;32m Team found in database: `);
    console.group();
    console.log(team);
    console.groupEnd();

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
dbController.verifyUser = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log('\u001b[1;32m dbController.verifyUser called ');

  // Pull out the username and password from the request body
  const { username, password } = req.body;
  console.log("Received username: " + username + " and password: " + password);

  // Find the user in the database
  User.findOne({username})
    .then((user) => {
      // Log to let us know the user was found
      console.log(`\u001b[1:32m User found in database: `);
      console.group();
      console.log(user);
      console.groupEnd();

      // Compare the password to the hashed password
      bcrypt.compare(password, user.password)
        .then((result) => {
          // If the passwords match
          if (result) {
            // Log to let us know the passwords match
            console.log(`\u001b[1;32m User verified!`);
            res.locals.user_info = user;
            return next();
          }
          // If the passwords don't match
          else {
            return next({
              log: `Error in dbController.verifyUser: Passwords don't match`,
              message: { err: 'Error occurred in dbController.verifyUser.' },
            });
          }
        })
        .catch((err) => {
          return next({
            log: `Error in dbController.verifyUser: ${err}`,
            message: { err: 'Error occurred in dbController.verifyUser.' },
          });
        });
    })
    .catch((err) => {
      return next({
        log: `Error in dbController.verifyUser: ${err}`,
        message: { err: 'Error occurred in dbController.verifyUser.' },
      });
    });
};


// Create a new User
dbController.createUser = async (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log('\u001b[1;32m dbController.createUser called ');

  // Pull out the user info from the request body
  const { username, password } = req.body;
  console.log("Received username: " + username + " and password: " + password);

  // Ensure the username is unique
  User.findOne({username}, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.createUser: ${err}`,
        message: { err: 'Error occurred in dbController.createUser.' },
      });
    }
    if(user) {
      // Log to let us know the user was found
      return next({
        log: `Error in dbController.createUser: Username already exists`,
        message: { err: 'Error occurred in dbController.createUser.' },
      });
      throw new Error('Username already exists');
    }
    else {
      // Log to let us know the user was not found
      console.log(`\u001b[1:32m Username does not exist `);
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
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
          console.log('\u001b[1:32m User saved to database: ');
          console.group();
          console.log(user);
          console.groupEnd();
          // Move to the next middleware
          return next();
        })
        .catch((err) => {
          // Error handling
          return next({
            log: `Error in dbController.createUser: ${err}`,
            message: { err: 'Error occurred in dbController.createUser.' },
          });
        });
    }
  });
};

// Create a new team
dbController.createTeam = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log('\u001b[1;32m dbController.createTeam called ');

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
      console.log('\u001b[1:32m Team saved to database ');
      res.locals.team_info = team;
      // Move to the next middleware
      return next();
    })
    .catch((err) => {
      // Error handling
      return next({
        log: `Error in dbController.createTeam: ${err}`,
        message: { err: 'Error occurred in dbController.createTeam.' },
      });
    })
};

// Update a user's information
dbController.updateUser = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log('\u001b[1;32m dbController.updateUser called ');

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
      console.log(`\u001b[1:32m User updated in database with return of : `);
      console.log(user);
      res.locals.user_info = user;
      return next();
    })
    .catch((err) => {
      // Error handling
      return next({
        log: `Error in dbController.updateUser: ${err}`,
        message: { err: 'Error occurred in dbController.updateUser.' },
      })
    })
};



module.exports = dbController;