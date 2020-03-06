'use strict';

/*
  Not very practical to do no validation, but added for completeness
*/
var express = require('express'),
    responseTime = require('response-time'),
    bodyParser = require('body-parser'),
    validator = require('validator'),
    app = express();

app.use(responseTime({ suffix: false }));
app.use(bodyParser.json());

app.post('/items', function (req, res) {
  if (!req.body.name || !req.body.date || !req.body.type || !req.body.user) {
    return res.status(400).send('Fields name, data, type, and user are required');
  }

  if (!validator.isDate(req.body.date)) {
    return res.status(400).send('body.date failed validation');
  }

  if (!validator.isIn(req.body.type, ['lawn', 'garden', 'tools'])) {
    return res.status(400).send('body.type failed validation');
  }

  if (!validator.isEmail(req.body.user)) {
    return res.status(400).send('body.user failed validation');
  }

  if (req.body.uuid && !validator.isUUID(req.body.uuid)) {
    return res.status(400).send('body.uuid failed validation');
  }

  if (req.body.url && !validator.isURL(req.body.url)) {
    return res.status(400).send('body.user failed validation');
  }

  return res.status(200).end();
});

app.get('/items', function (req, res) {
  if (!req.query.limit || !req.query.sort) {
    return res.status(400).send('Fields limit and sort are required');
  }

  if (req.query.since && !validator.isDate(req.query.since)) {
    return res.status(400).send('query.since failed validation');
  }

  if (!validator.isInt(req.query.limit)) {
    return res.status(400).send('query.limit failed validation');
  }

  if (req.query.page && !validator.isInt(req.query.page)) {
    return res.status(400).send('query.page failed validation');
  }

  return res.status(200).end();
});

app.get('/items/:item', function (req, res) {
  if (!validator.isMongoId(req.params.item)) {
    return res.status(400).send('params.item failed validation');
  }

  return res.status(200).end();
});

app.listen(3002);

module.exports = app;