'use strict';

var express = require('express'),
    responseTime = require('response-time'),
    bodyParser = require('body-parser'),
    routeValidator = require('../index'),
    app = express();

app.use(responseTime({ suffix: false }));
app.use(bodyParser.json());

app.post('/items', routeValidator.validate({
  body: {
    name: { isRequired: true },
    date: { isRequired: true, isDate: true },
    type: { isRequired: true, isIn: ['lawn', 'garden', 'tools'] },
    user: { isRequired: true, isEmail: true },
    uuid: { isRequired: false, isUUID: true },
    url: { isURL: true }
  }
}), function (req, res) {
  return res.status(200).end();
});

app.get('/items', routeValidator.validate({
  query: {
    since: { isDate: true },
    limit: { isInt: true, isRequired: true },
    page: { isInt: true, isRequired: false },
    sort: { isRequired: true }
  }
}), function (req, res) {
  return res.status(200).end();
});

app.get('/items/:item', routeValidator.validate({
  params: {
    item: { isMongoId: true, isRequired: true }
  }
}), function (req, res) {
  return res.status(200).end();
});

app.listen(3000);

module.exports = app;