const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../../server');
process.env.NODE_ENV = 'test';

const construct = require('../../lib/utility');
const gmAPI = require('../../lib/gmAPIRequests.js');

describe('GET /vehicles/:id/fuel', () => {

  beforeEach( () => {
    sandbox.stub(gmAPI, 'post');
  });

  afterEach( () => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should correctly transform GM response to Smartcar response', () => {
    const mockGMRes = {
      "service": "getEnergyService",
      "status": "200",
      "data": {
        "data": {
          "tankLevel": {
            "type": "Number",
            "value": "30"
          },
          "batteryLevel": {
            "type": "Null",
            "value": "null"
          }
        }
      }
    };


    const correctSmartcarRes = { "percent": 30 };

    gmAPI.post.resolves(mockGMRes);

    return gmAPI.post()
    .then( res => {
      const gmResponseData = res.data.data;
      const smartcarVehiclesInfoResponse = construct.energyRangeObject(gmResponseData, 'fuel');
      expect(smartcarVehiclesInfoResponse).to.deep.equal(correctSmartcarRes);
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });
});

describe('GET /vehicles/:id/battery', function() {

  beforeEach( () => {
    sandbox.stub(gmAPI, 'post');

  });

  afterEach( () => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should correctly transform GM response to Smartcar response', () => {
    const mockGMRes = {
      "service": "getEnergyService",
      "status": "200",
      "data": {
        "data": {
          "tankLevel": {
            "type": "Null",
            "value": "null"
          },
          "batteryLevel": {
            "type": "Number",
            "value": "30"
          }
        }
      }
    };


    const correctSmartcarRes = { "percent": 30 };

    gmAPI.post.resolves(mockGMRes);

    return gmAPI.post()
    .then( res => {
      const gmResponseData = res.data.data;
      const smartcarVehiclesInfoResponse = construct.energyRangeObject(gmResponseData, 'battery');
      expect(smartcarVehiclesInfoResponse).to.deep.equal(correctSmartcarRes);
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });
});