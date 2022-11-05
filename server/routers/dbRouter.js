const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();

// Figure out what sort of get requests may be necessary

///////////////////////////////////////////////////////////////////////////////
// GET routes /////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Route to request user data
router.get('/user/:{user_id}', dbController.getUserInfo, (req, res) => {
  res.status(200).json(res.locals.user_info);
});


// Route to get specific team's information
router.get('/teaminfo/:{team_id}', dbController.getTeamInfo, (req, res) => {
    res.status(200).json(res.locals.team_info);
});


// Route to get all of a team's activities
router.get('/teamactivities/:{team_id}', (req, res) => {
    res.status(200).json(res.locals.team_activities);
});

