require('dotenv').config();
const connection = require('../configs/db');

// Export product model
module.exports = {
    searchProduct:(name)=>{
      // console.log(typeof name);
      // return name
        return new Promise((resolve, reject)=>{
          connection.query("SELECT * FROM product_name WHERE name LIKE ?", '%'+name+'%', (err, result)=>{
            if(!err){
              resolve(result);
            }else{
              reject(new Error(err));
            }
          });
        });
      }
}
