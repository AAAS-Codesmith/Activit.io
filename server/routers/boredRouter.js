const express = require('express');
const boredController = require('../controllers/boredController.js');
const router = express.Router();

//// GET requests ////

// Generate random activity (no specificity, currently unused?)
router.get('/random', boredController.getRandom,(req,res) => {
    res.status(200).json(res.locals.info)
})

// Generate activity based on type
router.get('/type/:key', boredController.getType,(req,res) => {
    res.status(200).json(res.locals.info)
})

// Generate activity based on group size
router.get('/people/:number', boredController.getPeople,(req,res) => {
    res.status(200).json(res.locals.info)
})

// Generate activity based on price range
// router.get('/money/:price',boredController.getType,(req,res) => {
//     res.status(200).send()
// })

module.exports = router;