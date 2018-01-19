const express = require('express');
const router = express.Router();

const construct = require('../lib/utility')

const axios = require('axios')
const instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
const config = { 'responseType': 'JSON' }

router.post('/:id/engine', (req, res) => {
  // required parameters
  const vehicleID = req.params.id
  const commandType = req.query.action

  if( !commandType ) {
    res.status(400).send('A engine action parameter is required.')
  }

  instance.post('/actionEngineService', Object.assign({
    id: vehicleID,
    command: construct.engineActionType(commandType)
  }, config ))
  .then(( response ) => {
    const gmResponseData = response.data
    const smartcarEngineActionResponse = construct.engineActionObject(gmResponseData)
    res.status(200).send(smartcarEngineActionResponse)
  })
})

module.exports = router;