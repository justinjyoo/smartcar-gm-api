const construct = require('./lib/utility')
const express = require('express')

const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

const instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
const config = { 'responseType': 'JSON' }

// https://localhost:3000/
app.listen(port, () => console.log(`GM to Smartcar API is listening on port ${ port }!` ))

app.get('/', ( req, res ) => {
  res.status( 200 ).send('Welcome to the GM-Smartcar API! Please make a request to one of the available routes.')
})

app.get('/vehicles/:id', ( req, res ) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id parameter is required.')
  }

  instance.post( '/getVehicleInfoService', Object.assign({ id:  vehicleID }, config))
  .then(( response ) => {
    const gmResponseData = response.data.data
    const smartcarVehiclesInfoResponse = construct.vehiclesInfoObject(gmResponseData)
    res.status(200).send(smartcarVehiclesInfoResponse)
  })
})

app.get('/vehicles/:id/doors', ( req, res ) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id parameter is required.')
  }


  instance.post('/getSecurityStatusService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    const gmResponseData = response.data.data
    const smartcarDoorSecResponse = construct.doorSecObject(gmResponseData)
    res.status(200).send(smartcarDoorSecResponse)
  })
})

app.get('/vehicles/:id/fuel', (req, res) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id parameter is required.')
  }


  instance.post('/getEnergyService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    const gmResponseData = response.data.data
    const smartcarFuelResponse = construct.energyRangeObject(gmResponseData, 'fuel')
    res.status(200).send(smartcarFuelResponse)
  })
}).cat

app.get('/vehicles/:id/battery', ( req, res ) => {
  // required parameter
  const vehicleID = req.params.id

  if( !vehicleID ) {
    res.status(400).send('A vehicle id parameter is required.')
  }

  instance.post('/getEnergyService', Object.assign({ id: vehicleID }, config))
  .then(( response ) => {
    const gmResponseData = response.data.data
    const smartcarBatteryResponse = construct.energyRangeObject(gmResponseData, 'battery')
    res.status(200).send(smartcarBatteryResponse)
  })
})

app.post('/vehicles/:id/engine', ( req, res ) => {
  // required parameters
  const vehicleID = req.params.id
  const commandType = req.query.action

  if( !vehicleID ) {
    res.status(400).send('A vehicle id parameter is required.')
  }

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


app.all('*', function(req, res){
  res.status(404).send('There was an error in the requested route.');
});