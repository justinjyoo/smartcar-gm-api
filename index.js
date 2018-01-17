const express = require('express');
const axios = require('axios')
const app = express();

// https://localhost:3000/
app.listen(3000, () => console.log('Example app listening on port 3000!'))

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
    let doorCount;
    // fourDoorSedans (e.g., SUVs)
    if( gmResponseData.fourDoorSedan.value === 'True' ) {
      doorCount = 4
    // twoDoorSedans (e.g., coupes)
    } else if( gmResponseData.twoDoorSedan.value === 'True' ) {
      doorCount = 2
    // noDoorSedans (e.g., motorcycles)
    } else {
      doorCount = 0
    }

    const vehiclesSmartcarResponse = {
      "vin": gmResponseData.vin.value,
      "color": gmResponseData.color.value,
      "doorCount": doorCount,
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

