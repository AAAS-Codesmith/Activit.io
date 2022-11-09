const express = require("express");
const boredController = require("../controllers/boredController.js");
const router = express.Router();

//router to generate random activity option
router.get("/random", boredController.getRandom, (req, res) => {
  res.status(200).json(res.locals.info);
});

//router to generate activity by key name
router.get("/type/:key", boredController.getType, (req, res) => {
  res.status(200).json(res.locals.info);
});

//router to generate activity based on no. of participants
router.get("/people/:number", boredController.getPeople, (req, res) => {
  res.status(200).json(res.locals.info);
});

//router to generate activity based on price
// router.get('/money/:price',boredController.getType,(req,res) => {
//     res.status(200).send()
// })

module.exports = router;
