const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const VehiclesInfo = require('./routes/vehicleInfo.js');
const Security = require('./routes/security.js');
const FuelBatteryLevel = require('./routes/fuelBatteryLevel.js');
const StartStopEngine = require('./routes/startStopEngine.js');

app.listen(port, () => console.log(`GM to Smartcar API is listening on port ${ port }!` ));

app.get('/', ( req, res ) => res.status( 200 ).send('Welcome to the GM-Smartcar API! Please make a request to one of the available routes.'));

app.all('/vehicles', ( req, res ) => {
  // required parameter for all routes
  const vehicleID = req.params.id;
  if( !vehicleID ) {
    res.status(400).send('A vehicle id parameter is required.');
  }
});

app.use('/vehicles', VehiclesInfo);
app.use('/vehicles', Security);
app.use('/vehicles', FuelBatteryLevel);
app.use('/vehicles', StartStopEngine);

app.all('*', ( req, res ) => {
  res.status(404).send('Resource not found.');
});

module.exports = app;