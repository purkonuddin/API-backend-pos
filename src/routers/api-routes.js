// // initializ routes express
// let router = require('express').Router();
// //  initialize authenttifikasi,
// //  If a callback is supplied, function acts asynchronously.
// //  The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error
// const auth = require('../helpers/auth');
//
// // set default api response
// router.get('/', function(req, res){
//   res.json({
//     status : 'api its working',
//     message : 'welcome to camp depok!'
//   });
// });
//
// //  import product controller
// var productController = require('../controllers/productController');
// router.route('/product')
//   .get(auth.verify,productController.index)
//   .post(productController.new);
// router.route('/product/:id_product')
//   .get(productController.view)
//   .patch(productController.update)
//   .delete(productController.delete);
// router.route('/product/login')
//   .post(productController.loginUser);
// router.route('/paging')
//   .get(productController.paging); // pagination?page=0&perpage=2
//
// // Search product by name
// router.route('/search')
//   .get(productController.search);
//   //  import upload controller
// var uploadController = require('../controllers/uploadController');
// router.route('/upload')
//   .post(uploadController.upload);
//
// //  import category controller
// var categoryController = require('../controllers/categoryController');
// router.route('/category')
//   .get(categoryController.index)
//   .post(categoryController.new);
// router.route('/category/:id_category')
//   .get(categoryController.view)
//   .patch(categoryController.update)
//   .delete(categoryController.delete);
//
// // import order controller
// var orderController=require('../controllers/orderController');
// router.route('/order/:id_user/:no_transaction')
//   .post(auth.verify, orderController.order);
// router.route('/order')
//   .post(orderController.test);
// router.route('/historyPayment')
//   .get(orderController.view);
//
// // Enable CORS for a Single Route
//
// // var cors = require('cors');
// // var whitelist = ['http://localhost:3000/', 'http://localhost:8080/']
// // var corsOptions = {
// //   origin: function (origin, callback) {
// //     if (whitelist.indexOf(origin) !== -1 || !origin) {
// //       callback(null, true)
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   }
// // }
//
// // router.route('/cors')
// //   .get(cors(corsOptions), function (req, res, next) {
// //     res.json({msg: 'This is CORS-enabled for a whitelisted domain.'});
// //   });
//
// // exports api
// module.exports = router;
