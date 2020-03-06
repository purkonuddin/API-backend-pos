// var jwt = require('jsonwebtoken');
// var token = jwt.headers;
// var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
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
  // var insertSts;
  // var updateSts;
  productModel.productDetail(id_product).then((result)=>{
    // Cannot reduce Order below 0 (-1, -5, etc)
    // if (product.stock < 1 || product.stock < qty)
    if (result[0].stock < 1 || result[0].stock < qty) {
      // console.log('Cannot reduce Order below 0 (-1, -5, etc)');
      res.json({message:'Cannot reduce Order below 0'});
    }else {//}
      // var price = result[0].price;
      let updtStock = result[0].stock - qty;
      // add product order
      let data = {
        user,
        no_transaction,
        product : id_product,
        name : result[0].name,
        qty,
        price : result[0].price,
        sub_total:qty*result[0].price
      }
      let addProductOrder = new Promise((resolve, reject)=>{
        // var updtStock = result[0].stock - qty;
        orderModel.insertOrder(data).then((result)=>{
          console.log(['insertId :', result.insertId]);
          // insertSts = result.insertId;
          // console.log(insertSts);
          resolve(updtStock)
        })
        .catch(err=>console.log(err));

      });

      // update stok product
      addProductOrder.then(function(stock) {
        // updtStock = result - qty;
        //
        productModel.updateProductStock(id_product, stock).then((result)=>{
          console.log(['changedRows : ', result.changedRows]);
          // updateSts = result.changedRows;
        })
        .catch(err=>console.log(err))
      });

      addProductOrder.catch(err=>console.log(err));

      res.json({
              message:'add/reduce product order!',
              // id_s
              // result : {
              //   token : req.headers['token']
              //   // insertSts,
              //   // updateSts
              // },
              // data,
              // updtStock
            })
    }
  })
  .catch(err=>console.log(err));

}
exports.test=(req, res, err)=>{
  const updtStock = req.body.stock;
  const id_product = req.body.id_product;
  productModel.updateProductStock(id_product, updtStock).then((result)=>{
    console.log(['status update stok : ', result]);
  })
  .catch(err=>console.log(err));
}

exports.view=(req, res, err)=>{
  let test = orderModel.getOrderTotal();
  test.then((result)=>{
    console.log(result);
    res.json({result});
  });
  test.catch(err=>console.log(err));
}
// add to card tb_sementara
exports.card=(req, res, err)=>{
  let data = {
    id_user:req.body.id_user,
    id_barang:req.body.id_barang,
    qty : 1,
    status : false
  }
  // var addItemCard = new Promise((resolve, reject)=>{
    // var updtStock = result[0].stock - qty;
    orderModel.insertCard(data)
    .then((result)=>{
      console.log(['changedRows : ', result.insertId]);
      res.json({result});
    })
    .catch(err=>console.log(err));

  // });
}

exports.cards=(req, res, err)=>{
  const no_transaction =req.params.no_transaction
  let test = orderModel.getOrderBytransaction(no_transaction);
  test.then((result)=>{
    console.log(result);
    res.json(result);
  });
  test.catch(err=>console.log(err));
}

exports.max=(req, res, err)=>{
  const id_user =req.params.id_user
  let test = orderModel.getMaxNoOrder();
  test.then((result)=>{
    console.log(result);
    res.send(result);
  });
  test.catch(err=>console.log(err));
}
// update status tb_sementara
exports.cardSts=(req, res, err)=>{
  const id_card =req.params.id_s;
  let test = orderModel.updateCardSts(id_card);
  test.then((result)=>{
    console.log(result);
    res.send(result);
  });
  test.catch(err=>console.log(err));
}
 
