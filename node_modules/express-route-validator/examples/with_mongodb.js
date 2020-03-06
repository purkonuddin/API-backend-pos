/*
  mongodb, https://www.npmjs.com/package/mongodb, is the official Node.js driver for MongoDB.
  When building RESTful APIs with Mongo as your datastore, you are constantly sending around
  ObjectIds (http://docs.mongodb.org/manual/reference/object-id/), Mongo's unique id type.
  `validator` comes built with a useful validator when working with Mongo, `validator.isMongoId`,
  which validates that it's an ObjectId string, e.g. "507f1f77bcf86cd799439011",
  and `express-route-validator` extends that.

  Validating that the `ObjectId` for the item is valid could save you a 500 down the line if
  it fails to cast the id. Another useful functionality that you could add is a coercer to coerce
  the ObjectId string to an actual ObjectId. When using the native driver, you have to cast
  incoming ObjectId strings to actual ObjectId types before attempting queries or anything interfacing
  with the DB involving ObjectIds. However, it's easy to add a coercer to do that for you.
  See below.
*/

'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    routeValidator = require('../index'),
    app = express(),
    mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = mongo.ObjectID;

// Connect to local db. Must have mongod process running
MongoClient.connect('mongodb://localhost/validator', function (err, db) {
  if (err) throw err;

  var Items = db.collection('items');

  // Add a custom coercer to cast id string to an ObjectId
  routeValidator.addCoercer('toMongoId', {
    stage: 'after',
    coerce: function (str) {
      return new ObjectID(str);
    }
  });

  app.use(bodyParser.json());

  app.post('/items', routeValidator.validate({
    body: {
      name: { isRequired: true, isLength: { min: 2, max: 40 }, trim: true },
      description: { isRequired: false, trim: true }
    }
  }), function (req, res) {
    var item = {
      name: req.body.name,
      description: req.body.description
    };

    Items.insertOne(item, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(201).send(item);
    });
  });

  app.get('/items/:item', routeValidator.validate({
    params: {
      // The Mongo driver does not automatically cast ObjectId strings
      // to ObjectIds, so this would return 404s if you never cast
      // the ObjectId string to an actual ObjectId
      item: { isRequired: true, isMongoId: true, toMongoId: true }
    }
  }), function (req, res) {
    Items.findOne({ _id: req.params.item }, function (err, item) {
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
});