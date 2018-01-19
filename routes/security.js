const express = require('express');
const router = express.Router();

const construct = require('../lib/utility')
const gmAPI = require('../lib/gmAPIRequests.js')

router.get('/:id/doors', (req, res) => {
  gmAPI.get('/getSecurityStatusService', req, res, construct.doorSecObject)
})

module.exports = router;