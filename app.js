var express = require('express');
var api = require('./api');

app = express();

app.get('/', (req, res) => {
  api.consultar('HOMERO MASSENA')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
