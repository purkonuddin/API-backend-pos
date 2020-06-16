const productModel = require('../models/productModel');
// const miscHelper = require('../helpers/auth');
var multer  = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
});

var upload = multer({ storage: storage }).single('image')

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
              result:result
            });
        })
        .catch(err=>console.log(err));
    },

    new: (req, res, err)=>{
      let uploadStatus = new Promise((resolve, reject)=>{
        let dataImage = multer({ storage: storage ,fileFilter: fileFilter}).single('image');

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
              image:`${process.env.REACT_APP_URL_UPLOADS+result}`,
              id_category:req.body.id_category
          }
          productModel.insertProduct(data).then((result)=>{
              res.json({
                status:"new product created!",
                data:data,
                message:result
              });
          })
          .catch(err=>{
            res.json({
                  status:err
                },console.log(err));
          });
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
        let file_image = result[0].image.substr(result[0].image.indexOf("uploads/")+8);
        // console.log(file_image);
        fs.unlink('uploads/'+file_image, function (err) {
            if (err) console.log(err);
            // if no error, file has been deleted successfully
            // console.log(result[0].image+', File deleted!');
        });
        res.json({
          status:"success",
          message:"Product deleted",
          data:result[0]
        });
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
