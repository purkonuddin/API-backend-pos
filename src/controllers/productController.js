// var express = require('express');
// const app = express();

const productModel = require('../models/productModel');
// const miscHelper = require('../helpers/auth');
var multer  = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
//

// import product model
// import model upload
// const uploadModel = require('../models/uploadModel');

//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
});

var upload = multer({ storage: storage }).single('image')

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '././uploads/')
//   },
//   filename: function (req, file, cb) {
//     var extFile = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + Date.now() + extFile)
//   }
// });
//
function fileFilter (req, file, cb){
  var extFile = path.extname(file.originalname);
    // mime type test
    var filetypeallowed = /(png|gif|jpg)/;
    var mimetype = filetypeallowed.test(file.mimetype); // return boolean
    // cek jika extension bukan png|gif|jpg atau mimetype tidak sama dengan filetypeallowed
    if(!mimetype){
        // skip uploadnya
        cb(null, false)
    } else {
        cb(null, true)
    }
}
//
// var upload = multer({storage: storage, dest: "././uploads/", fileFilter: fileFilter}).single('image');

// handle index action
module.exports = {
    index: (req, res)=>{
        // req.headers['x-access-token']=req.session.user.token;
        productModel.getProduct().then((result)=>{
            res.json({
              status:"Success",
              message:"Product Retrived successfully",
              result:result,
              // session:req.session,
              // headers:req.headers
            });
            // miscHelper.response(res, result, 200)
        })
        .catch(err=>console.log(err));
    },

    new: (req, res, err)=>{
      // cek file image
      // upload file
      // ambil data image. nama file
      var uploadStatus = new Promise((resolve, reject)=>{
        var dataImage = multer({ storage: storage ,fileFilter: fileFilter}).single('image');

        // var dataImage = multer({storage: storage, dest: "././uploads/", fileFilter: fileFilter}).single('image');
        dataImage(req, res, err => {
          if (req.file) {
            resolve(req.file.filename)
          }else {
            reject(res.json({
              message:'image tidak boleh kosong',
              rules:'file harus jpg|png|gif'
            }));
          }
        });
      });

      uploadStatus.then(
        // simpan ke tb_product
        function(result) {
          // console.log(result+ ', akan disimpan');
          const data = {
              name:req.body.name,
              description:req.body.description,
              price:req.body.price,
              stock:req.body.stock,
              image:`http://192.168.1.192:8080/uploads/${result}`,
              id_category:req.body.id_category
          }
          productModel.insertProduct(data).then((result)=>{
              res.json({
                status:"new product created!",
                data:data,
                message:result
              });
          })
          .catch(err=>console.log(err));
      })
      .catch(function(reason) {
        res.json({
              status:"denide!",
              data:reason
            });
      });
    },

    update:(req,res)=>{
      const id_product = req.params.id_product;
      const data = {
          name:req.body.name,
          description:req.body.description,
          price:req.body.price,
          stock:req.body.stock,
          id_category:req.body.id_category
      }
      productModel.updateProduct(id_product, data).then((result)=>{
        res.json({
          message:"product info updated",
          data:result
        });
      })
      .catch(err=>console.log(err));
    },
    delete:(req, res)=>{
      // include node fs module
      var fs = require('fs');

      const id_product = req.params.id_product;
      productModel.deleteProduct(id_product).then((result)=>{
        fs.unlink('uploads/'+result[0].image, function (err) {
            if (err) console.log(err);
            // if no error, file has been deleted successfully
            console.log(result[0].image+', File deleted!');
        });
        res.json({
          status:"success",
          message:"Product deleted",
          data:result[0]
        });
      })
      .catch(err=>console.log(err));
    },

    search:(req, res)=>{
      const name = req.body.name;
      productModel.searchProduct(name).then((result)=>{
        res.json({
          status:"Success",
          message:"Product Retrived successfully",
          result:result
        });
      })
      .catch(err=>console.log(err));
    },

    pag:(req, res, err)=>{
      let page = req.body.page;
      let perpage = req.body.perpage;

      let offset = page > 1 ? (page*perpage)-perpage : 0;
      let totalRec = 0;
      let pageCount =0;
      productModel.countProduct().then((result)=>{
        totalRec=result[0].rows;
        pageCount = Math.ceil(totalRec/perpage);
        productModel.pagingProduct(offset, perpage).then((result)=>{
          res.json({
            page:parseInt(page),
            offset:offset,
            per_page:parseInt(perpage),
            total:parseInt(totalRec),
            total_page:parseInt(pageCount),
            next_page:page < pageCount - 1 ? parseInt(page)+1 : undefined,
            prev_page:page > 1 ? page - 1 : undefined,
            data:result
          })
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
    },

    view:(req, res)=>{
      const id_product = req.params.id_product;
      productModel.productDetail(id_product).then((result)=>{
          res.json({
                // message:"product detail loading...",
                data:result
              })
      })
      .catch(err=>console.log(err));
    }
};
