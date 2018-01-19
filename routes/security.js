const express = require('express');
const router = express.Router();

const construct = require('../lib/utility')

const axios = require('axios')
const instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
const config = { 'responseType': 'JSON' }

router.get('/:id/doors', (req, res) => {
  // required parameter
  const vehicleID = req.params.id

  instance.post('/getSecurityStatusService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    const gmResponseData = response.data.data
    const smartcarDoorSecResponse = construct.doorSecObject(gmResponseData)
    res.status(200).send(smartcarDoorSecResponse)
  })
})

module.exports = router;