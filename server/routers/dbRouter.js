const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();
const cors = require('cors');
// Figure out what sort of get requests may be necessary


//// GET routes ////
// Route to request/return user data
router.get('/user/:username', dbController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.user_info);
});

// Route to get/return specific team's information
router.get('/teaminfo/:team_id', dbController.getTeamInfo, (req, res) => {
  return res.status(200).json(res.locals.team_info);
});


//// POST routes ////
// Route to verify user on login/return boolean
router.post('/login', dbController.verifyUser, (req, res) => {
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

// Route to add activity to a specific team
router.post('/addActivity', dbController.addActivity, (req, res) => {
  return res.status(200).json(res.locals.team);
})

//// PUT routes ////
// Goals: Change current activity
// Check in frontend on what data type/edits they'll be sending

//// DELETE routes ////
// Goals: Add delete for activities and accounts










// Alex working on delete
router.delete('/deleteActivity', (req, res) => {
  console.log('');
  return res.status(200).json({deleted: 'Delete test succesful'});
})
module.exports = router;