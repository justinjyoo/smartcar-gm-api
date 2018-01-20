const express = require('express');
const router = express.Router();

const construct = require('../lib/utility');
const gmAPI = require('../lib/gmAPIRequests.js');

router.get('/:id/fuel', ( req, res ) => {
  gmAPI.get('/getEnergyService', req, res, construct.energyRangeObject, 'fuel');
});

router.get('/:id/battery', ( req, res ) => {
  gmAPI.get('/getEnergyService', req, res, construct.energyRangeObject, 'battery');
});

module.exports = router;