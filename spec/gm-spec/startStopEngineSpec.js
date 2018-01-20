const expect = require('chai').expect;
const axios = require('axios');
const http = axios.create({
  baseURL: 'http://gmapi.azurewebsites.net',
  // if request to GM takes longer than 5 seconds the request will be aborted
  timeout: 5000
});

const config = { 'responseType': 'JSON' };

// These tests will ping the GM API and SHOULD BE RUN SPARINGLY!

describe('POST /actionEngineService', () => {

  it('should respond with an expected nested response.data.data structure', () => {
    const vehicleID = '1234';
    const route = '/actionEngineService';

    return http.post( route, Object.assign({ id:  vehicleID, command: "START_VEHICLE" }, config))
    .then( res => {
      expect(res).to.have.nested.property('data');
      expect(res.data).to.have.any.keys('actionResult');
      expect(res.data.actionResult).to.have.any.keys('status');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });

  });

});