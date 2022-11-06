const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();

// Figure out what sort of get requests may be necessary

///////////////////////////////////////////////////////////////////////////////
// GET routes /////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Route to request user data
router.get('/user/:user_id', dbController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.user_info);
});

// Route to get specific team's information
router.get('/teaminfo/:team_id', dbController.getTeamInfo, (req, res) => {
  return res.status(200).json(res.locals.team_info);
});


///////////////////////////////////////////////////////////////////////////////
// POST routes ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Route to verify user on login
router.post('/login', dbController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user_info);
});

// Route to add a new user to the database
router.post('/register', dbController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user_info);
});

// Route to add a new team to the database
router.post('/team', dbController.createTeam, dbController.updateUser, (req, res) => {
  return res.status(200).json(res.locals.team_info);
});


module.exports = router;