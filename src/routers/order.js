const express = require('express');
// const multer = require('multer');
const auth = require('../helpers/auth');

const Router = express.Router();
const orderController = require('../controllers/orderController');
// post -> redux/actions/checkout.checkout
Router.route('/order/:id_user/:no_transaction')
  .post(orderController.order);
  
// Router.route('/order')
//   .post(orderController.test);
// Router.route('/historyPayment')
//   .get(orderController.view);
// Router.route('/card')
//   .post(orderController.card)
//   .get(orderController.max);

// get -> redux/actions/checkout.getCheckout
Router.route('/:no_transaction')
  .get(orderController.cards);
// Router.route('/cards/:id_s')
//   .patch(orderController.cardSts);
module.exports = Router;
