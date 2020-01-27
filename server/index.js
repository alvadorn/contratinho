var express = require('express');
var spdy = require('spdy');
var fs = require('fs');
var app = express();

var carDB = [{
  id: 1,
  name: 'Fusca',
  manufacturer: 'Volkswagen',
}, {
  id: 2,
  name: 'Diablo Coatl',
  manufacturer: 'Lamborghini',
}];

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/cars', function (req, res) {
  res.json(carDB);
});

app.get('/cars/:id', function (req, res) {
  res.json(carDB[req.params.id - 1]);
});

var port = 5555;
spdy.createServer({
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.cert'),
  spdy: {
	protocols: ['h2'],
  }
}, app).listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
