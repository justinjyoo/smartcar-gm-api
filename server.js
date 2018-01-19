const convert = require('./lib/utility')
const express = require('express')

const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

let instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
let config = { 'responseType': 'JSON' }

// https://localhost:3000/
app.listen(port, () => console.log(`GM to Smartcar API is listening on port ${ port }!` ))

app.get('/', ( req, res ) => {
  res.status( 200 ).send('hello world')
})

app.get('/vehicles/:id', ( req, res ) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id is required.')
  }

  instance.post( '/getVehicleInfoService', Object.assign({ id:  vehicleID }, config))
  .then(( response ) => {
    let gmResponseData = response.data.data
    let smartcarVehiclesInfoResponse = convert.vehiclesInfoResponseObject(gmResponseData)
    res.status(200).send(smartcarVehiclesInfoResponse)
  })
})

app.get('/vehicles/:id/doors', ( req, res ) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id is required.')
  }


  instance.post('/getSecurityStatusService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    let gmResponseData = response.data.data
    let smartcarDoorSecResponse = convert.doorSecResponseObject(gmResponseData)
    res.status(200).send(smartcarDoorSecResponse)
  })
})

app.get('/vehicles/:id/fuel', (req, res) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id is required.')
  }


  instance.post('/getEnergyService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    let gmResponseData = response.data.data
    let smartcarFuelResponse = convert.energyRangeObject(gmResponseData, 'fuel')
    res.status(200).send(smartcarFuelResponse)
  })
}).cat

app.get('/vehicles/:id/battery', ( req, res ) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id is required.')
  }

  instance.post('/getEnergyService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    let gmResponseData = response.data.data
    let smartcarBatteryResponse = convert.energyRangeObject(gmResponseData, 'battery')
    res.status(200).send(smartcarBatteryResponse)
  })
})

app.post('/vehicles/:id/engine', ( req, res ) => {
  // required parameters
  const vehicleID = req.params.id
  const commandType = req.query.action

  if( !vehicleID ) {
    res.status(400).send('A vehicle id is required.')
  }

  if( !commandType ) {
    res.status(400).send('A engine action is required.')
  }

  instance.post('/actionEngineService', Object.assign({
    id: vehicleID,
    command: convert.convertEngineActionType(commandType)
  }, config ))
  .then(( response ) => {
    let gmResponseData = response.data
    let smartcarEngineActionResponse = convert.engineActionResponseObject(gmResponseData)
    res.status(200).send(smartcarEngineActionResponse)
  })
})