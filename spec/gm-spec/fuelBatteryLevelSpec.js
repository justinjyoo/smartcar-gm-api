const expect = require('chai').expect;
const axios = require('axios');
const http = axios.create({
  baseURL: 'http://gmapi.azurewebsites.net',
  // if request to GM takes longer than 5 seconds the request will be aborted
  timeout: 5000
});

const config = { 'responseType': 'JSON' };

// These tests will ping the GM API and SHOULD BE RUN SPARINGLY!

describe('POST /getEnergyService', () => {

  it('should respond with an expected nested response.data.data structure', () => {
    const vehicleID = '1234';
    const route = '/getEnergyService';

    return http.post( route, Object.assign({ id:  vehicleID }, config))
    .then( res => {
      const expectedKeys = [ 'tankLevel', 'batteryLevel' ];
      expect(res).to.have.nested.property('data.data');
      expect(res.data.data).to.have.all.keys(expectedKeys);
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });

  });

});