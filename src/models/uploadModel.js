require('dotenv').config();
const connection = require('../configs/db');
// Export product model
module.exports = {
  imageProduct:(data)=>{
    return new Promise((resolve, reject)=>{
        connection.query("INSERT INTO upload SET ?", data, (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  }
}
