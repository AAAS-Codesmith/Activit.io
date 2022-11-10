const express = require("express");
const dbController = require("../controllers/dbController.js");
const router = express.Router();
const cors = require("cors");
// Figure out what sort of get requests may be necessary

///////////////////////////////////////////////////////////////////////////////
// GET routes /////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Route to request user data
router.get("/user/:username", dbController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.user_info);
});

// Route to get specific team's information
router.get("/teaminfo/:team_id", dbController.getTeamInfo, (req, res) => {
  return res.status(200).json(res.locals.team_info);
});

///////////////////////////////////////////////////////////////////////////////
// POST routes ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Route to verify user on login
router.post("/login", dbController.verifyUser, (req, res) => {
  return res.status(200).json({
    user_info: res.locals.user_info,
    login_success: true,
  });
});

// Route to sigin with google
router.post("/google-login", dbController.googleUserAuth, (req, res) => {
  return res
    .status(200)
    .json({ user_info: res.locals.user_info, login_success: true });
});

// Route to add a new user to the database
router.post("/register", dbController.createUser, (req, res) => {
  return res.status(200).json({
    user_info: res.locals.user_info,
    register_response: true,
  });
});

// Route to add a new team to the database
router.post(
  "/team",
  dbController.createTeam,
  dbController.updateUser,
  (req, res) => {
    return res.status(200).json(res.locals.team_info);
  }
);

// Route to add activity to the database
router.post("/addActivity", dbController.addActivity, (req, res) => {
  return res.status(200).json(res.locals.team);
});

module.exports = router;
