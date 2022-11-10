const dbController = {};
const Team = require("../db/mongo/TeamModel.js");
const User = require("../db/mongo/UserModel.js");
const mongoose = require("mongoose");
const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../process.env"),
});
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

///////////////////////////////////////////////////////////////////////////////
// POST Controllers ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Verify user
dbController.verifyUser = (req, res, next) => {
  // Pull out the email and password from the request body
  const { email, password } = req.body;
  if (!email || !password)
    return next({
      log: "Error encountered in dbController.verifyUser",
      message: "Incomplete details.",
    });
  // Find the user in the database
  User.findOne({ email })
    .then((user) => {
      // Compare the password to the hashed password
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          // If the passwords match
          if (result) {
            // Log to let us know the passwords match
            //JS delete operator does not work on mongoose query result: you need to convert the Mongoose document object into an ordinary object first
            const userObj = user.toObject();
            // delete password from user info object to be sent to the frontend
            delete userObj.password;
            res.locals.user_info = userObj;
            return next();
          }
          // If the passwords don't match
          else {
            return next({
              log: `Error in dbController.verifyUser`,
              message: { err: "Email and password don't match." },
            });
          }
        })
        .catch((err) => {
          return next({
            log: `Error in dbController.verifyUser.`,
            message: { err },
          });
        });
    })
    .catch((err) => {
      return next({
        log: `Error in dbController.verifyUser.`,
        status: 500,
        message: { err },
      });
    });
};

// Create a new User
dbController.createUser = async (req, res, next) => {
  // Destructure user info from the request body
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next({
      log: "Error encountered in dbController.createUser",
      message: "Incomplete details.",
    });

  // Ensure the email is unique
  User.findOne({ email }, (err, user) => {
    // Error handling
    if (err) {
      return next({
        log: `Error in dbController.createUser.`,
        message: { err },
      });
    }
    if (user) {
      // Log to let us know the user was found
      return next({
        log: `Error in dbController.createUser.`,
        message: { err: "Email already exists." },
      });
    } else {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      // Generate a random userID for the new user
      const randomAlphanumeric =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      // Create a new user object
      User.create({
        user_id: randomAlphanumeric,
        username,
        email,
        password: hashedPassword,
        // teams: { team: req.params.team_id },
      })
        .then((user) => {
          //JS delete operator does not work on mongoose query result: you need to convert the Mongoose document object into an ordinary object first
          const userObj = user.toObject();
          // delete password from user info object to be sent to the frontend
          delete userObj.password;
          res.locals.user_info = userObj;
          // Move to the next middleware
          return next();
        })
        .catch((err) => {
          // Error handling
          return next({
            log: `Error in dbController.createUser`,
            status: 500,
            message: { err },
          });
        });
    }
  });
};

// Signup/Sign in a user with Google
dbController.googleUserAuth = async (req, res, next) => {
  let user;
  const { username, email, googleId } = req.body;
  if (!username || !email || !googleId)
    return next({
      log: "Error encountered in dbController.googleUserAuth",
      message: "Incomplete details.",
    });
  // check if user exists
  user = await User.findOne({ googleId }).exec();

  if (!user) {
    // randome id generation for user
    const randomAlphanumeric =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    user = await User.create({
      user_id: randomAlphanumeric,
      googleId,
      username,
      email,
    });
  }
  //JS delete operator does not work on mongoose query result: you need to convert the Mongoose document object into an ordinary object first
  const userObj = user.toObject();
  // delete password from user info object to be sent to the frontend
  delete userObj.password;
  res.locals.user_info = userObj;
  return next();
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

module.exports = dbController;
