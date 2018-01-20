const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../../server');
process.env.NODE_ENV = 'test';

const construct = require('../../lib/utility');
const gmAPI = require('../../lib/gmAPIRequests.js');

describe('GET /vehicles/:id/doors', () => {

  beforeEach( () => {
    sandbox.stub(gmAPI, 'post')
  });

  afterEach( () => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should correctly transform GM response to Smartcar response', () => {
    const mockGMRes = {
      "service": "getSecurityStatus",
      "status": "200",
      "data": {
          "data": {
          "doors": {
            "type": "Array",
            "values": [
              {
                "location": {
                  "type": "String",
                  "value": "frontLeft"
                },
                "locked": {
                  "type": "Boolean",
                  "value": "True"
                }
              },
              {
                "location": {
                  "type": "String",
                  "value": "frontRight"
                },
                "locked": {
                  "type": "Boolean",
                  "value": "True"
                }
              }
            ]
          }
        }
      }
    };

    const correctSmartcarRes = [
      {
        "location": "frontLeft",
        "locked": true
      },
      {
        "location": "frontRight",
        "locked": true
      }
    ];

    gmAPI.post.resolves(mockGMRes);

    return gmAPI.post()
    .then( res => {
      const gmResponseData = res.data.data;
      const smartcarVehiclesInfoResponse = construct.doorSecObject(gmResponseData);
      expect(smartcarVehiclesInfoResponse[0]).to.deep.equal(correctSmartcarRes[0]);
      expect(smartcarVehiclesInfoResponse[1]).to.deep.equal(correctSmartcarRes[1]);
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });
});
