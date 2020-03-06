'use strict';

/*
  Not very practical to do no validation, but added for completeness
*/
var express = require('express'),
    responseTime = require('response-time'),
    bodyParser = require('body-parser'),
    app = express();

app.use(responseTime({ suffix: false }));
app.use(bodyParser.json());

app.post('/items', function (req, res) {
  return res.status(200).end();
});

app.get('/items', function (req, res) {
  return res.status(200).end();
});

app.get('/items/:item', function (req, res) {
  return res.status(200).end();
});

app.listen(3001);

module.exports = app;