require('dotenv').config();
const connection = require('../configs/db');

// Export product model
module.exports = {
    getProduct: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT product_name.*, category.name_category FROM product_name INNER JOIN category ON product_name.id_category = category.id WHERE product_name.stock>0 ORDER BY category.name_category", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    insertProduct: (data)=>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO product_name SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    productDetail: (id_product)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT product_name.*, category.name_category FROM product_name INNER JOIN category ON product_name.id_category = category.id WHERE product_name.id=?", id_product, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    updateProduct: (id_product,data)=>{

        return new Promise((resolve, reject)=>{
            connection.query("UPDATE product_name SET ? WHERE id=?",[data,id_product], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    updateProductStock: (id_product,stock)=>{

        return new Promise((resolve, reject)=>{
            connection.query("UPDATE product_name SET stock=? WHERE id=?",[stock,id_product], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    deleteProduct: (id_product)=>{

        return new Promise((resolve, reject)=>{
          connection.query("SELECT * FROM product_name WHERE id=?", id_product, (err, image)=>{
            if (image) {
              connection.query("DELETE FROM product_name WHERE id=?", id_product, (err, result)=>{
                if(!err){
                  resolve(image);
                }else{
                  reject(new Error(err));
                }
              });

            }
          });

        })
    }, 
    searchProduct:(name)=>{
      return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM product_name WHERE name LIKE ?", '%'+name+'%', (err, result)=>{ 
          if(!err){
            resolve(result);
          }else{
            reject(new Error(err));
          }
        });
      });
    },
    countProduct:()=>{
      return new Promise((resolve, reject)=>{
        connection.query('SELECT COUNT(*) AS rows FROM product_name', (err, result)=>{
          resolve(result);
        });
      });
    },
    pagingProduct:(page, perpage)=>{
      return new Promise((resolve, reject)=>{
        // var offset = page+", "+perpage;
        connection.query(`SELECT * FROM product_name LIMIT ${page+", "+perpage}`, (err, result)=>{
          // console.log(names);
          if(!err){
            resolve(result);
          }else{
            reject(new Error(err));
          }
        });
      });
    },
    loginUser:(req, res)=>{
    var token = jwt.sign({ id: 1, name: 'nama userrrr' }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
    res.json({
      token: token
    })
  }
}
