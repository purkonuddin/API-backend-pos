const productModel = require('../models/productModel');
const paginate = require('express-paginate');

exports.index = (req, res, err)=>{
    let page = req.params.page;
    let perpage = req.params.perpage;

    let offset = page > 1 ? (page*perpage)-perpage : 0;
    let totalRec = 0;
    let pageCount =0;
    productModel.countProduct().then((result)=>{
        totalRec=result[0].baris;
        pageCount = Math.ceil(totalRec/perpage);
        productModel.pagingProduct(offset, perpage).then((result)=>{
          res.json({
            curren_page:parseInt(page),
            offset:offset,
            per_page:parseInt(perpage),
            total:parseInt(totalRec),
            total_page:parseInt(pageCount),
            next_page:page <= pageCount - 1 ? parseInt(page)+1 : undefined,
            prev_page:page > 1 ? page - 1 : undefined,
            result
          })
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
}

exports.view = async (req, res, next) => {
  try {
    const offset = req.query.page > 1 ? (req.query.page*req.query.limit)-req.query.limit : 0;
    const [ results, itemCount ] = await Promise.all([
      productModel.pagingProduct(offset, req.query.limit),
      productModel.countProduct()
    ]);
    const totalrows = itemCount[0].baris;
    const pageCount = Math.ceil(totalrows / req.query.limit);
    if (req.accepts('json')) {
      // inspired by Stripe's API response for list objects
      res.json({
        object: 'products',
        has_more: paginate.hasNextPages(req)(pageCount),
        total_page:pageCount,
        total:totalrows,
        curren_page:parseInt(req.query.page),
        offset:offset,
        hasPreviousPages:res.locals.hasPreviousPages,
        hasNextPages:paginate.hasNextPages(req)(pageCount),
        next_page:req.query.page <= pageCount - 1 ? parseInt(req.query.page)+1 : undefined,
        prev_page:req.query.page > 1 ? req.query.page - 1 : undefined,
        pages: paginate.getArrayPages(req)(pageCount, pageCount, req.query.page),
        data: results
      });
    } else {
      res.render('product', {
        products: results,
        pageCount,
        itemCount: totalrows,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      });
    }
  } catch (err) {
    next(err);
  }
}
