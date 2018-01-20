const expect = require('chai').expect
const axios = require('axios')
const instance = axios.create({
  baseURL: 'http://gmapi.azurewebsites.net',
  // if request to GM takes longer than 5 seconds the request will be aborted
  timeout: 5000
})

const config = { 'responseType': 'JSON' }

// These tests will ping the GM API and SHOULD BE RUN SPARINGLY!

describe('POST /getSecurityStatusService', function() {

  it('should respond with an expected nested response.data.data structure', () => {
    const vehicleID = '1234'
    const route = '/getSecurityStatusService'

    return instance.post( route, Object.assign({ id:  vehicleID }, config))
    .then( res => {
      const expectedKeys = ['location', 'locked']
      expect(res).to.have.nested.property('data.data')
      expect(res.data.data).to.have.any.keys('doors')
      expect(res.data.data.doors).to.have.any.keys('values')
      expect(res.data.data.doors.values).to.have.any.keys([0])
      expect(res.data.data.doors.values[0]).to.have.all.keys(expectedKeys)
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    })

  })

});