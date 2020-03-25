const express = require('express');
// const multer = require('multer');
// const auth = require('../helpers/auth');

const Router = express.Router();
const categoryController = require('../controllers/categoryController');
// digunakan pada :
// get -> src/components/product.category
// get -> src/components/category.reloadData
// post -> src/components/category.onSubmitForm
Router.route('/')
  .get(categoryController.index)
  .post(categoryController.new);
// get -> src/components/category.getDataId(:id)
// patch -> src/components/category.onSubmitForm(:id)
// delete -> src/components/category.handleRemove(:id)
Router.route('/:id_category')
  .get(categoryController.view)
  .patch(categoryController.update)
  .delete(categoryController.delete);

module.exports = Router;
