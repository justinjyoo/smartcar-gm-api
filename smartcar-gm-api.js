const express = require('express');
const app = express();

// https://localhost:3000/
app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  console.log('/ success!')
  res.status(400).send('hello world')
  res.end()
})

app.post('/vehicles/:id', (req, res) => {
  axios.post
  res.status(400).send('posted!')
})



//curl -X POST smartcar-gm-api.js http://localhost:3000/vehicles
//curl -X GET smartcar-gm-api.js http://localhost:3000/


// curl http://gmapi.azurewebsites.net/getVehicleInfoService \
//        -X POST \
//        -H 'Content-Type: application/json' \
//        -d '{"id": "1234", "responseType": "JSON"}' \

// SMARTCAR SPEC
// Request:
// GET /vehicles/:id

// Response:
// {
//   "vin": "1213231",
//   "color": "Metallic Silver",
//   "doorCount": 4,
//   "driveTrain": "v8"
// }




// GM API
// Request:
// POST /getVehicleInfoService

// Content-Type: application/json
// {
//   "id": "1234",
//   "responseType": "JSON"
// }
// Response:
// {
//   "service": "getVehicleInfo",
//   "status": "200",
//   "data": {
//     "vin": {
//       "type": "String",
//       "value": "123123412412"
// }, "color": {
//       "type": "String",
//       "value": "Metallic Silver"
//     },
//     "fourDoorSedan": {
//       "type": "Boolean",
//       "value": "True"
//     },
//     "twoDoorCoupe": {
//       "type": "Boolean",
//       "value": "False"
//     },
//     "driveTrain": {
//       "type": "String",
//       "value": "v8"
//     }
//   }
// }