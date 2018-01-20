const axios = require('axios');
const http = axios.create({
  baseURL: 'http://gmapi.azurewebsites.net',
  // if request to GM takes longer than 5 seconds the request will be aborted
  timeout: 5000
});

const config = { 'responseType': 'JSON' };

// common GET request re-used for every smartcar route
exports.get = ( route, smartcarReq, smartcarRes, transform, ...transformArgs ) => {
  // required parameter
  const vehicleID = smartcarReq.params.id;

  http.post( route, Object.assign({ id:  vehicleID }, config))
  .then( gmRes => {

    if( gmRes.data.status === '404' ) {
      smartcarRes.status(404).send('Vehicle cannot be found.');
    }

    const gmResponseData = gmRes.data.data;
    const smartcarVehiclesInfoResponse = transform(gmResponseData, ...transformArgs);
    smartcarRes.status(200).send(smartcarVehiclesInfoResponse);
  })
  .catch( err => {
    smartcarRes.status(502).send('Bad gateway. The service is temporarily unavailable.');
  });
};

// common POST request re-used for every smartcar route
exports.post = ( route, smartcarReq, smartcarRes, queryObj, transform, ...transformArgs ) => {
  // required parameter
  const vehicleID = smartcarReq.params.id;

  http.post( route, Object.assign({ id:  vehicleID }, queryObj, config))
  .then( gmRes => {

    if( gmRes.data.status === '404' ) {
      smartcarRes.status(404).send('Vehicle cannot be found.');
    }

    const gmResponseData = gmRes.data;
    const smartcarVehiclesInfoResponse = transform(gmResponseData, ...transformArgs);
    smartcarRes.status(201).send(smartcarVehiclesInfoResponse);
  })
  .catch( err => {
    smartcarRes.status(502).send('Bad gateway. The service is temporarily unavailable.');
  });
};