const axios = require("axios");
const boredController = {};

boredController.getRandom = (req,res,next) => {
    console.log('in getRandom')
    axios.get('http://www.boredapi.com/api/activity/')
    .then(data => {
        console.log(data.data)
        res.locals.info = data.data;
        return next()
    })
    .catch(err => {
        return next({
          log: 'ERROR in boredController.getRandom MW',
          status: 400,
          message: 'Error Occurred'
        })
    })
}

boredController.getType = (req,res,next) => {
    console.log('in getType MW')
    const key = req.params.key;
    console.log('key',key)
    axios.get(`http://www.boredapi.com/api/activity?type=${key}`)
    .then(data => {
        res.locals.info = data.data;
        return next()
    })
    .catch(err => {
        return next({
          log: 'ERROR in boredController.getType MW',
          status: 400,
          message: 'Error Occurred'
        })
    })
}

boredController.getPeople = (req,res,next) => {
    console.log('in getPeople MW')
    const number = req.params.number;
    axios.get(`http://www.boredapi.com/api/activity?participants=${number}`)
    .then(data => {
        res.locals.info = data.data;
        return next()
    })
    .catch(err => {
        return next({
          log: 'ERROR in boredController.getPeople MW',
          status: 400,
          message: 'Error Occurred'
        })
    })
}
// boredController.getPrice = (req,res,next) => {
//     const price = req.params.price;
//     axios.get('http://www.boredapi.com/api/activity/')
//     .then(data => {
//         res.locals.info = data;
//         return next()
//     })
//     .catch(err => {
//         return next({
//           log: 'ERROR in boredController.getPrice MW',
//           status: 400,
//           message: 'Error Occurred'
//         })
//     })
// }


module.exports = boredController;