// require('dotenv').config();
//
// var express = require('express');
// const app = express();
var multer  = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '././uploads/')
  },
  filename: function (req, file, cb) {
    var extFile = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extFile)
  }
});

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

var upload = multer({storage: storage, dest: "././uploads/", fileFilter: fileFilter}).single('image');

// import model upload
const uploadModel = require('../models/uploadModel');

// handle upload action
// app.post('/', upload.single('image'),
exports.upload = function(req,res,err){
  upload(req, res, err => {
     if (err) throw err

     // console.log(req.body, req.file);
     if(req.file){
       const data = {
           image:req.file.filename,
           description:req.body.description
         }
       uploadModel.imageProduct(data).then((result)=>{
         res.json({
                 status:"Upload file success !",
                 data:req.file,
                 result:result
               })

       })
       .catch(err=>console.log(err));
     }else {
       res.send({
         status:"Uploar File skiped !",
         message:"File type Allowed : jpg|gif|png"
       })
     }
   });
  };
