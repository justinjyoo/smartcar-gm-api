const express = require('express');
const router = express.Router();

const construct = require('../lib/utility')

const axios = require('axios')
const instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
const config = { 'responseType': 'JSON' }

router.get('/:id/fuel', (req, res) => {
  // required parameter
  const vehicleID = req.params.id

  instance.post('/getEnergyService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    const gmResponseData = response.data.data
    const smartcarFuelResponse = construct.energyRangeObject(gmResponseData, 'fuel')
    res.status(200).send(smartcarFuelResponse)
  })
})

router.get('/:id/battery', (req, res) => {
  // required parameter
  const vehicleID = req.params.id

  instance.post('/getEnergyService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {

    const gmResponseData = response.data.data
    console.log(gmResponseData)
    const smartcarBatteryResponse = construct.energyRangeObject(gmResponseData, 'battery')
    res.status(200).send(smartcarBatteryResponse)
  })
})

module.exports = router;