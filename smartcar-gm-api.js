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
    let doorCount;
    console.log(response.data.data)


    if( response.data.data.fourDoorSedan.value === 'True' ) {
      doorCount = 4
    } else if( response.data.data.fourDoorSedan.value === 'True' ) {
      doorCount = 2
    } else {
      doorCount = 0
    }

    const vehiclesSmartcarResponse = {
      "vin": response.data.data.vin.value,
      "color": response.data.data.color.value,
      "doorCount": doorCount,
      "driveTrain": response.data.data.driveTrain.value
    }
    // console.log(response.data)
    res.status(200).send(vehiclesSmartcarResponse)

  })

})

