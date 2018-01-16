const express = require('express');
const app = express();

// https://localhost:3000/
app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  console.log('/ success!')
  res.status(400).send('hello wfdsorld')
  res.end()
})

app.post('/vehicles', (req, res) => {
  console.log('test')
  res.status(400).send('posted!')
})



//curl -X POST smartcar-gm-api.js http://localhost:3000/vehicles
//curl -X GET smartcar-gm-api.js http://localhost:3000/


