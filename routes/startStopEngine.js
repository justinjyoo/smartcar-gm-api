const express = require('express');
const router = express.Router();

const construct = require('../lib/utility')
const gmAPI = require('../lib/gmAPIRequests.js')

router.post('/:id/engine', (req, res) => {
  // Smartcar POST query object
  const commandType = req.query.action

  if( !commandType ) {
    res.status(400).send('A engine action parameter is required.')
  }

  // GM POST query object
  const queryObj = { command: construct.engineActionType(commandType) }
  gmAPI.post('/actionEngineService', req, res, queryObj, construct.engineActionObject)
})

module.exports = router;