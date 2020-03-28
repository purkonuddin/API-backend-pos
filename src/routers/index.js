const express = require('express');
const Router = express.Router();
const auth = require('../helpers/auth');
const paginate = require('express-paginate');

const product = require('./product');
const category = require('./category');
const order = require('./order');
const user = require('./user');
const search = require('./search');
const pagination = require('./pagination');
const chart = require('./chart');

// set default api response
Router.get('/', function(req, res){

    res.json({
      status : 'api its working',
      message : 'welcome to camp depok!',
      data: {
        headers:req.headers
      }
    });
  });
// auth.verify,
Router.use('/user', user);
Router.use('/product', product);
Router.use('/category', category);
Router.use('/order', order);
Router.use('/search', search);
Router.use(paginate.middleware(10, 50));
Router.use('/pagination', pagination);
Router.use('/chart', chart);

module.exports = Router;
