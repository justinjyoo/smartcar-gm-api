const convert = require('./lib/utility')
const express = require('express')

const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

let instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
let config = { 'responseType': 'JSON' }

// https://localhost:3000/
app.listen(port, () => console.log('GM to Smartcar API is listening on port 3000!'))

app.get('/', (req, res) => {
  res.status(200).send('hello world')
})

app.get('/vehicles/:id', (req, res) => {
  instance.post('/getVehicleInfoService', Object.assign({ id: req.params.id }, config))
  .then( (response) => {
    let gmResponseData = response.data.data
    let smartcarVehiclesInfoResponse = convert.vehiclesInfoResponseObject(gmResponseData)
    res.status(200).send(smartcarVehiclesInfoResponse)
  })
})

app.get('/vehicles/:id/doors', (req, res) => {
  instance.post('/getSecurityStatusService', Object.assign({ id: req.params.id }, config))
  .then( (response) => {
    let gmResponseData = response.data.data
    let smartcarDoorSecResponse = convert.doorSecResponseObject(gmResponseData)
    res.status(200).send(smartcarDoorSecResponse)
  })
})

app.get('/vehicles/:id/fuel', (req, res) => {
  instance.post('/getEnergyService', Object.assign({ id: req.params.id }, config))
  .then( (response) => {
    let gmResponseData = response.data.data
    let smartcarFuelResponse = convert.energyRangeObject(gmResponseData, 'fuel')
    res.status(200).send(smartcarFuelResponse)
  })
})

app.get('/vehicles/:id/battery', (req, res) => {
  instance.post('/getEnergyService', Object.assign({ id: req.params.id }, config))
  .then( (response) => {
    let gmResponseData = response.data.data
    let smartcarBatteryResponse = convert.energyRangeObject(gmResponseData, 'battery')
    res.status(200).send(smartcarBatteryResponse)
  })
})

app.post('/vehicles/:id/engine', (req, res) => {
  instance.post('/actionEngineService', Object.assign({
    id: req.params.id,
    command: convert.convertEngineActionType(req.query.action)
  }, config))
  .then( (response) => {
    let gmResponseData = response.data
    let smartcarEngineActionResponse = convert.engineActionResponseObject(gmResponseData)
    res.status(200).send(smartcarEngineActionResponse)
  })
})