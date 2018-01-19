const express = require('express');
const router = express.Router();

const construct = require('../lib/utility')
const gmAPI = require('../lib/gmAPIRequests.js')

router.get('/:id', (req, res) => {
  gmAPI.get('/getVehicleInfoService', req, res, construct.vehiclesInfoObject)
})

module.exports = router;