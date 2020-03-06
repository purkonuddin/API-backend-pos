/*
  mongoose, https://www.npmjs.com/package/mongoose, is a popular module when working with MongoDB.
  When building RESTful APIs with Mongo as your datastore, you are constantly sending around
  ObjectIds (http://docs.mongodb.org/manual/reference/object-id/), Mongo's unique id type.
  `validator` comes built with a useful validator when working with Mongo, `validator.isMongoId`,
  which validates that it's an ObjectId string, e.g. "507f1f77bcf86cd799439011",
  and `express-route-validator` extends that.

  Validating that the `ObjectId` for the item is valid could save you a 500 down the line if
  it fails to cast the id. Another useful functionality that you could add is a coercer to coerce
  the ObjectId string to an actual ObjectId. In Mongoose, it will often convert the type for you,
  but there are some cases where it won't. However, it's easy to add a coercer to do that for you.
  See below.
*/

'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    routeValidator = require('../index'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;

// Connect to local db. Must have mongod process running
mongoose.connect('mongodb://localhost/validator');

// Define Mongoose schema
var ItemSchema = new Schema({
  name: { type: String, required: true, trim: true},
  description: { type: String }
});

var Item = mongoose.model('Item', ItemSchema);

// Add a custom coercer to cast id string to an ObjectId
routeValidator.addCoercer('toMongoId', {
  stage: 'after',
  coerce: function (str) {
    return new ObjectId(str);
  }
});

app.use(bodyParser.json());

app.post('/items', routeValidator.validate({
  body: {
    name: { isRequired: true, isLength: { min: 2, max: 40 }, trim: true },
    description: { isRequired: false, trim: true }
  }
}), function (req, res) {
  Item.create({
    name: req.body.name,
    description: req.body.description
  }, function (err, item) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(item);
  });
});

app.get('/items/:item', routeValidator.validate({
  params: {
    // While in this case, Mongoose will automatically cast item to an
    // ObjectId before attempting to find, this demonstrates the functionality.
    item: { isRequired: true, isMongoId: true, toMongoId: true }
  }
}), function (req, res) {
  Item.findById(req.params.item, function (err, item) {
    if (err) {
      return res.status(500).send(err);
    }

    if (!item) {
      return res.status(404).end();
    }

    return res.status(200).send(item);
  });
});

app.listen(3000, function () {
  console.log('Listing on port 3000');
});