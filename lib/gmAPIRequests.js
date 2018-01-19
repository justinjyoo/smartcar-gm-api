const axios = require('axios')
const instance = axios.create({ baseURL: 'http://gmapi.azurewebsites.net' })
const config = { 'responseType': 'JSON' }

exports.get = ( route, smartcarReq, smartcarRes, transform, ...transformArgs ) => {
  // required parameter
  const vehicleID = smartcarReq.params.id

  instance.post( route, Object.assign({ id:  vehicleID }, config))
  .then( gmRes => {
    const gmResponseData = gmRes.data.data
    const smartcarVehiclesInfoResponse = transform(gmResponseData, ...transformArgs)
    smartcarRes.status(200).send(smartcarVehiclesInfoResponse)
  })
  .catch( err => {
    smartcarRes.status(502).send('Bad gateway. The service is temporarily unavailable.')
  })
}

exports.post = ( route, smartcarReq, smartcarRes, queryObj, transform, ...transformArgs ) => {
  // required parameter
  const vehicleID = smartcarReq.params.id

  instance.post( route, Object.assign({ id:  vehicleID }, queryObj, config))
  .then( gmRes => {
    const gmResponseData = gmRes.data
    const smartcarVehiclesInfoResponse = transform(gmResponseData, ...transformArgs)
    smartcarRes.status(200).send(smartcarVehiclesInfoResponse)
  })
  .catch( err => {
    smartcarRes.status(502).send('Bad gateway. The service is temporarily unavailable.')
  })
}
