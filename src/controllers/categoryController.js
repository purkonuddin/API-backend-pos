// import product model
const categoryModel = require('../models/categoryModel');

// handle index action
exports.index = function (req, res) {
  categoryModel.getCategory().then((result)=>{
      res.json({
        status:"Success",
        message:"Category Retrived successfully",
        data:result
      });
      // miscHelper.response(res, result, 200)
  })
  .catch(err=>console.log(err));
};

// Handle create category actions
exports.new = function (req, res) {
  const data = {
      name_category:req.body.name_category
  }
// save the category and check for errors
  categoryModel.insertCategory(data).then((result)=>{
       // if (err)
       //     res.json(err);
       res.json({
           message: 'New category created!',
           data: result
       });
   });
};

// Handle view category info
exports.view = function (req, res) {
  const id_category = req.params.id_category;
  categoryModel.categoryDetail(id_category).then((result)=>{
//        if (err)
//            res.send(err);
       res.json({
           message: 'Category details loading..',
           data: result
       });
  })
  .catch((err)=>{
    res.send(err);
  });
};

// Handle update category info
exports.update = function (req, res) {
  const id_category = req.params.id_category;
  const data = {
      name_category:req.body.name_category
  }
  // save the category and check for errors
  categoryModel.updateCategory(id_category, data).then((result)=>{
    res.json({
      message:"Category info updated",
      data:result
    });
  })
  .catch(err=>console.log(err));
};

// Handle delete category
exports.delete = function (req, res) {
  const id_category = req.params.id_category;
  let checktabelproduct = categoryModel.checkCategory(id_category);
  checktabelproduct.then((result)=>{
    if (result.length>0) {
      res.json({
          status:"cancel",
          message:"kategori ini masih digunakan pada tabel product",
          result:result
        });
    }else {
      categoryModel.deleteCategory(id_category).then((result)=>{
        res.json({
          status:"success",
          message:"Category deleted",
          result:result
        });
      })
      .catch(err=>console.log(err));
    }
  })
  .catch(err=>console.log(err));
};
