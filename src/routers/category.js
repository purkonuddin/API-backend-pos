const express = require('express');
// const multer = require('multer');
// const auth = require('../helpers/auth');

const Router = express.Router();
const categoryController = require('../controllers/categoryController');

Router.route('/category')
  .get(categoryController.index)
  .post(categoryController.new);
Router.route('/category/:id_category')
  .get(categoryController.view)
  .patch(categoryController.update)
  .delete(categoryController.delete);

module.exports = Router;
