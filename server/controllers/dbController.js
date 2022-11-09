const Team = require("../db/mongo/TeamModel.js");
const User = require("../db/mongo/UserModel.js");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS || 10;

// Are these being used ?
/* require('dotenv').config({path: path.resolve(__dirname, '../../process.env')});*/
const mongoose = require("mongoose");
const db = require("../db/db.js");

const dbController = {};

//// GET Controllers ////

// Get a user's information
dbController.getUserInfo = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log("\u001b[1;32m dbController.getUserInfo called ");

  // Pull out the user_id from the request body
  const { username } = req.params;

  // Find the user in the database
  User.find({ username }, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.getUserInfo: ${err}`,
        message: { err: "Error occurred in dbController.getUserInfo." },
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
  console.log("\u001b[1;32m dbController.getTeamInfo called ");

  // Pull out the team_id from the request body
  const { team_id } = req.params;

  // Find the team in the database
  Team.find({ team_id }, (err, team) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.getTeamInfo: ${err}`,
        message: { err: "Error occurred in dbController.getTeamInfo." },
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

//// POST Controllers ////

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
  User.findOne({ username: username })
    .then((user) => {
      // Log to let us know the user was found
      console.log(`\u001b[1:32m User found in database: `);
      console.group();
      console.log(user);
      console.groupEnd();

      // Compare the password to the hashed password
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          // If the passwords match
          if (result) {
            // Log to let us know the passwords match
            console.log(`\u001b[1;32m User verified!`);
            res.locals.user_info = user;
            res.locals.login_success = true;
            return next();
          }
          // If the passwords don't match
          else {
            return next({
              log: `Error in dbController.verifyUser: Passwords don't match`,
              message: { err: "Error occurred in dbController.verifyUser." },
            });
          }
        })
        // Error catch for bycrypt compare
        .catch((err) => {
          return next({
            log: `Error in dbController.verifyUser: ${err}`,
            message: { err: "Error occurred in dbController.verifyUser - Bcrypt" },
          });
        });
    })
    // Error catch for user lookup
    .catch((err) => {
      return next({
        log: `Error in dbController.verifyUser: ${err}`,
        message: { err: "Error occurred in dbController.verifyUser." },
      });
    });
};

// Create a new User
dbController.createUser = async (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log("\u001b[1;32m dbController.createUser called ");

  // Pull out the user info from the request body
  const { username, password } = req.body;
  console.log("Received username: " + username + " and password: " + password);

  // Schema could enforce unique username versus coding it out?
  // Ensure the username is unique
  User.findOne({ username }, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.createUser: ${err}`,
        message: { err: "Error occurred in dbController.createUser." },
      });
    }
    if (user) {
      // Log to let us know the user was found
      return next({
        log: `Error in dbController.createUser: Username already exists`,
        message: { err: "Error occurred in dbController.createUser." },
      });
      throw new Error("Username already exists");
    } else {
      // Log to let us know the user was not found
      console.log(`\u001b[1:32m Username does not exist `);
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      console.log('Hashed password: ',hashedPassword, ' data type:', typeof hashedPassword);

      // Why?
      // Generate a random userID for the new user
      const randomAlphanumeric =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      // Create a new user object
      console.log("creating user");
      User.create({
        user_id: randomAlphanumeric,
        username,
        password: hashedPassword,
        teams: {} 
      })
        .then((user) => {
          // Log to let us know the user was saved
          console.log("\u001b[1:32m User saved to database: ");
          console.group();
          console.log(user);
          console.groupEnd();
          res.locals.user_info = user;
          res.locals.register_response = true;
          // Move to the next middleware
          return next();
        })
        .catch((err) => {
          // Error handling
          return next({
            log: `Error in dbController.createUser: ${err}`,
            message: { err: "Error occurred in dbController.createUser." },
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
  console.log("\u001b[1;32m dbController.createTeam called ");

  res.locals.username = req.body.username;

  // Pull out the team info from the request body
  const { teamName, teamMembers } = req.body;
  console.log(
    "Received teamName: " + teamName + " and members: " + teamMembers
  );

  // Generate a random teamID for the new team
  const randomAlphanumeric =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // Create a new team object
  Team.create({
    team_id: randomAlphanumeric,
    teamName,
    teamMembers,
    posts: {},
    activities: [
      {
        activity: "Take your dog on a walk",
        type: "relaxation",
        price: 0,
        numParticipants: 1,
      },
    ],
  })
    .then((team) => {
      // Log to let us know the team was saved
      console.log("\u001b[1:32m Team saved to database ");
      res.locals.team = team;
      // Move to the next middleware
      return next();
    })
    .catch((err) => {
      // Error handling
      return next({
        log: `Error in dbController.createTeam: ${err}`,
        message: { err: "Error occurred in dbController.createTeam." },
      });
    });
};

// Update a user's information
dbController.updateUser = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log("\u001b[1;32m dbController.updateUser called ");

  // Pull out the team_id and name from res.locals.team_info
  console.log(res.locals.team.team_id);
  const team_id = res.locals.team.team_id;
  const teamName = res.locals.team.teamName;

  // Pull out the user_id from the request body
  const username = res.locals.username;
  console.log("Received username: " + username);

  // Find the user in the DB and insert the team_id into the teams object
  User.findOneAndUpdate(
    { username: username },
    { $set: { [`teams.${team_id}`]: teamName } }
  )
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
        message: { err: "Error occurred in dbController.updateUser." },
      });
    });
};

// Update a team's information with a new activity
dbController.addActivity = (req, res, next) => {
  console.log("\n");
  console.log("\n");
  // Log to let us know we're in the controller
  console.log("\u001b[1;32m dbController.addActivity called ");
  console.log("Req body", req.body);
  // Pull out the team_id from res.locals.team_id and the activity info from res.locals.activity
  const team_id = req.body.team_id;
  console.log("Received team_id: " + team_id);
  const activity = req.body.activity;

  //     "activity": "Take your dog on a walk",
  //     "type": "relaxation",
  //     "participants": 1,
  //     "price": 0,
  // Find the team in the DB and insert the activity object into its activities array
  Team.updateOne({ team_id: team_id }, { $push: { teamActivities: activity } })
    .then((team) => {
      // Log to let us know the team was updated
      console.log(`\u001b[1:32m Team updated in database with return of : `);
      console.log(team);
      res.locals.team_info = team;
      return next();
    })
    .catch((err) => {
      // Error handling
      return next({
        log: `Error in dbController.addActivity: ${err}`,
        message: { err: "Error occurred in dbController.addActivity." },
      });
    });
};















// Delete Activity

module.exports = dbController;
