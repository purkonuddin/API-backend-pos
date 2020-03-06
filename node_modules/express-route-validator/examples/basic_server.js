'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    routeValidator = require('../index'),
    app = express();

app.use(bodyParser.json());

var counter = 0,
    items = [];

routeValidator.addValidator('isValidId', function (str) {
  var id = +str;
  return id >= 0 && id < counter;
});

app.post('/items', routeValidator.validate({
  body: {
    name: { isRequired: true, isLength: { min: 2, max: 40 }, trim: true },
    description: { isRequired: false, trim: true }
  }
}), function (req, res) {
  var item = {
    name: req.body.name,
    description: req.body.description,
    id: counter++
  };

  items.push(item);

  return res.status(201).send(item);
});

app.get('/items/:item', routeValidator.validate({
  params: {
    item: { isRequired: true, isInt: true, isValidId: true, toInt: true }
  }
}), function (req, res) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === req.params.item) {
      return res.status(200).send(items[i]);
    }
  }

  return res.status(404).end();
});

app.listen(3000, function () {
  console.log('Listing on port 3000');
});