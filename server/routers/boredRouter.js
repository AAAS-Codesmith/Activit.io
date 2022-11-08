const express = require('express');
const boredController = require('../controllers/boredController.js');
const router = express.Router();

router.get('/random', boredController.getRandom,(req,res) => {
    res.status(200).json(res.locals.info)
})
router.get('/type/:key', boredController.getType,(req,res) => {
    res.status(200).json(res.locals.info)
})
router.get('/people/:number', boredController.getPeople,(req,res) => {
    res.status(200).json(res.locals.info)
})

// router.get('/money/:price',boredController.getType,(req,res) => {
//     res.status(200).send()
// })

module.exports = router;