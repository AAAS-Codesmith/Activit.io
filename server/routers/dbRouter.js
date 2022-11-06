const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();
const cors = require('cors');
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
  console.log(' Received response from dbController.verifyUser in dbRouter.js ');
  console.log('res.locals.response: ',res.locals.login_response)
  return res.status(200).json({login_success: true});
});

// Route to add a new user to the database
router.post('/register', dbController.createUser, (req, res) => {
  return res.status(200).json(res.locals.register_response);
});

// Route to add a new team to the database
router.post('/team', dbController.createTeam, dbController.updateUser, (req, res) => {
  return res.status(200).json(res.locals.team_info);
});


module.exports = router;