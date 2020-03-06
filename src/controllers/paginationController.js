const productModel = require('../models/productModel');

exports.index = (req, res, err)=>{
    let page = req.params.page; 
    let perpage = req.params.perpage;
    
    let offset = page > 1 ? (page*perpage)-perpage : 0;
    let totalRec = 0;
    let pageCount =0; 
    productModel.countProduct().then((result)=>{
        totalRec=result[0].rows;
        pageCount = Math.ceil(totalRec/perpage); 
        productModel.pagingProduct(offset, perpage).then((result)=>{ 
          res.json({
            curren_page:parseInt(page),
            offset:offset,
            per_page:parseInt(perpage),
            total:parseInt(totalRec),
            total_page:parseInt(pageCount),
            next_page:page < pageCount - 1 ? parseInt(page)+1 : undefined,
            prev_page:page > 1 ? page - 1 : undefined,
            result 
          })
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
}