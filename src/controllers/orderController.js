const productModel = require('../models/productModel');

const orderModel = require('../models/orderModel');

exports.order=(req, res, err)=>{
  let user = req.body.id_user;
  let no_transaction = req.body.no_transaction; // prefix TR-999
  let id_product = req.body.id_product;
  let qty = req.body.qty;
  let stock=0;
  let updtStock =0;
  let id_s=req.body.id_s;

  productModel.productDetail(id_product).then((result)=>{
    // Cannot reduce Order below 0 (-1, -5, etc)
    // if (product.stock < 1 || product.stock < qty)
    if (result[0].stock < 1 || result[0].stock < qty) {
      // console.log('Cannot reduce Order below 0 (-1, -5, etc)');
      res.json({message:'Cannot reduce Order below 0'});
    }else {//}
      // var price = result[0].price;
      const created_at = new Date();
      let updtStock = result[0].stock - qty;
      // add product order
      let data = {
        user,
        no_transaction,
        product : id_product,
        name : result[0].name,
        qty,
        price : result[0].price,
        sub_total:qty*result[0].price,
        created_at:created_at
      }
      let addProductOrder = new Promise((resolve, reject)=>{
        // var updtStock = result[0].stock - qty;
        orderModel.insertOrder(data).then((result)=>{
          resolve(updtStock)
        })
        .catch(err=>console.log(err));

      });

      // update stok product
      addProductOrder.then(function(stock) {
        // updtStock = result - qty;
        //
        productModel.updateProductStock(id_product, stock).then((result)=>{
          // console.log(['changedRows : ', result.changedRows]);
          // updateSts = result.changedRows;
        })
        .catch(err=>console.log(err))
      });

      addProductOrder.catch(err=>console.log(err));

      res.json({
              message:'add/reduce product order!',
            })
    }
  })
  .catch(err=>console.log(err));

}

exports.cards=(req, res, err)=>{
  const no_transaction =req.params.no_transaction
  let test = orderModel.getOrderBytransaction(no_transaction);
  test.then((result)=>{
    // console.log(result);
    res.json(result);
  });
  test.catch(err=>console.log(err));
}
 
