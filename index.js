
const axios = require('axios')
const utility = require('./lib/utility')
const express = require('express');

const app = express();

// https://localhost:3000/
app.listen(3000, () => console.log('GM to Smartcar API is listening on port 3000!'))

app.get('/', (req, res) => {
  console.log('/ success!')
  res.status(200).send('hello world')
})

app.get('/vehicles/:id', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/getVehicleInfoService', {
      "id": req.params.id,
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarVehiclesInfoResponse = utility.constructVehiclesInfoResponseObject(gmResponseData)
    res.status(200).send(smartcarVehiclesInfoResponse)
  })
})

app.get('/vehicles/:id/doors', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService', {
      "id": req.params.id,
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarDoorSecResponse = utility.constructDoorSecResponseObject(gmResponseData)
    res.status(200).send(smartcarDoorSecResponse)
  })
})

app.get('/vehicles/:id/fuel', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', {
      "id": req.params.id,
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarFuelResponse = utility.constructEnergyRangeObject(gmResponseData, 'fuel')
    res.status(200).send(smartcarFuelResponse)
  })
})

app.get('/vehicles/:id/battery', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', {
      "id": req.params.id,
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data.data;
    let smartcarBatteryResponse = utility.constructEnergyRangeObject(gmResponseData, 'battery')
    res.status(200).send(smartcarBatteryResponse)
  })
})

app.post('/vehicles/:id/engine', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/actionEngineService', {
      "id": req.params.id,
      "command": utility.convertEngineActionType(req.query.action),
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data;
    let smartcarEngineActionResponse = utility.constructEngineActionResponseObject(gmResponseData)
    res.status(200).send(smartcarEngineActionResponse)
  })
})