const jwt = require('jsonwebtoken');
const searchModel = require('../models/searchModel');
module.exports = {
    index:(req, res)=>{
      // console.log(req);
        const nama = req.query.name;
        searchModel.searchProduct(nama).then((result)=>{
          res.json({
            result:result
          });
        })
        .catch(err=>console.log(err));
        // console.log(nama);
      }
}
