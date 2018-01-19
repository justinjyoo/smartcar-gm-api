const utility = require('./lib/utility')
const express = require('express');

const app = express();
const axios = require('axios')

let gmAxiosInstance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' });
let gmAxiosConfig = { 'responseType': 'JSON' }

// https://localhost:3000/
app.listen(3000, () => console.log('GM to Smartcar API is listening on port 3000!'))

app.get('/', (req, res) => {
  res.status(200).send('hello world')
})

app.get('/vehicles/:id', (req, res) => {
  gmAxiosConfig = Object.assign({ id: req.params.id }, gmAxiosConfig)
  gmAxiosInstance.post('/getVehicleInfoService', gmAxiosConfig)
  .then( (response) => {
    let gmResponseData = response.data.data;
    console.log(response)
    let smartcarVehiclesInfoResponse = utility.constructVehiclesInfoResponseObject(gmResponseData)
    res.status(200).send(smartcarVehiclesInfoResponse)
  })
})

app.get('/vehicles/:id/doors', (req, res) => {
  gmAxiosConfig = Object.assign({ id: req.params.id }, gmAxiosConfig)
  gmAxiosInstance.post('/getSecurityStatusService', gmAxiosConfig)
  .then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarDoorSecResponse = utility.constructDoorSecResponseObject(gmResponseData)
    res.status(200).send(smartcarDoorSecResponse)
  })
})

app.get('/vehicles/:id/fuel', (req, res) => {
  gmAxiosConfig = Object.assign({ id: req.params.id }, gmAxiosConfig)
  gmAxiosInstance.post('/getEnergyService', gmAxiosConfig)
  .then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarFuelResponse = utility.constructEnergyRangeObject(gmResponseData, 'fuel')
    res.status(200).send(smartcarFuelResponse)
  })
})

app.get('/vehicles/:id/battery', (req, res) => {
  gmAxiosConfig = Object.assign({ id: req.params.id }, gmAxiosConfig)
  gmAxiosInstance.post('/getEnergyService', gmAxiosConfig)
  .then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarBatteryResponse = utility.constructEnergyRangeObject(gmResponseData, 'battery')
    res.status(200).send(smartcarBatteryResponse)
  })
})

app.post('/vehicles/:id/engine', (req, res) => {

  gmAxiosConfig = Object.assign({
    id: req.params.id,
    command: utility.convertEngineActionType(req.query.action)
  }, gmAxiosConfig)

  gmAxiosInstance.post('/actionEngineService', gmAxiosConfig)
  .then( (response) => {
    let gmResponseData = response.data;
    let smartcarEngineActionResponse = utility.constructEngineActionResponseObject(gmResponseData)
    res.status(200).send(smartcarEngineActionResponse)
  })
})