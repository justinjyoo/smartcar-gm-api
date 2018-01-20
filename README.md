# smartcar-gm-api

REST API for Smartcar-GM transformations. All interaction occurs through hitting various REST endpoints.

## API Documentation

See the [API-DOC.md](API-DOC.md) file.

## Tech Stack

  * [Node](https://github.com/nodejs) & [Express](https://github.com/expressjs/express)
  * [Mocha](https://mochajs.org/) with [Chai](http://chaijs.com/) and [Supertest](https://www.npmjs.com/package/supertest)

## Usage

Run the following script from within the root directory to start the server:
```
npm start
```

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```

### Testing

The test suite is built with **Mocha**, **Chai**, and **Supertest** (for mock HTTP requests). 

Then, to run all smartcar-specific tests:

```
npm run test:smartcar-spec
```

**GM API-specific tests should be run one at a time and only when necessary. Queries to the GM API should be minimized.**

GM API tests ensure that the data returns as expected.

To run all gm-api-specific tests:

```
npm run test:smartcar-spec
```
|GM API Route|Command|
|---|---|
|/getEnergyService|npm run test:fuelBatteryLevel-gm-spec|
|/getSecurityStatusService|npm run test:security-gm-spec|
|/actionEngineService|npm run test:startStopEngine-gm-spec|
|/getVehicleInfoService|npm run test:vehicleInfo-gm-spec|

