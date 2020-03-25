const express = require('express');

const Router = express.Router();
const productController = require('../controllers/productController');
// digunakan pada :
// get -> ridux/actions/product.getProducts
// post -> src/components/product.onSubmitForm
Router.route('/')
  .get(productController.index)
  .post(productController.new);
// get -> src/components/product.getDataId(:id)
// patch -> src/components/product.onSubmitForm(:id)
// delete -> src/components/product.handleRemove(:id)
Router.route('/:id_product')
  .get(productController.view)
  .patch(productController.update)
  .delete(productController.delete);
// Router.route('/search')
//   .get(productController.search);
// Router.route('/page')
//   .get(productController.pag);

module.exports = Router;
