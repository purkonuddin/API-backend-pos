const express = require('express'); 

const Router = express.Router();
const productController = require('../controllers/productController'); 

Router.route('/')
  .get(productController.index)
  .post(productController.new);
  
Router.route('/:id_product')
  .get(productController.view)
  .patch(productController.update)
  .delete(productController.delete);  
Router.route('/search')
  .get(productController.search);
Router.route('/page')
  .get(productController.pag);

module.exports = Router;
