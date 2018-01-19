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

Then, to run all smartcar tests:

```
npm run test:smartcar-spec
```

