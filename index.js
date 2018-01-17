
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

app.post('/vehicles/:id', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/getVehicleInfoService',{
      "id": req.params.id,
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data.data;

    const vehiclesSmartcarResponse = {
      "vin": gmResponseData.vin.value,
      "color": gmResponseData.color.value,
      "doorCount": utility.getVehicleDoorCount(gmResponseData),
      "driveTrain": gmResponseData.driveTrain.value
    }

    res.status(200).send(vehiclesSmartcarResponse)
  })
})

app.post('/vehicles/:id/doors', (req, res) => {
  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService',{
      "id": req.params.id,
      "responseType": "JSON"
  }).then( (response) => {
    let gmResponseData = response.data.data;

    const getSecurityStatusSmartcarResponse =

    res.status(200).send(getSecurityStatusSmartcarResponse)
  })

})

