require('dotenv').config();
const connection = require('../configs/db');

// Export product model
module.exports = {
    getUser:(payload)=>{
        return new Promise((resolve, reject)=>{
          connection.query("SELECT password FROM user WHERE id = ? AND email = ?", [payload.id, payload.email], (err, result)=>{
            if(!err){
              resolve(result);
            }else{
              reject(new Error(err));
            }
          });
        });
      }
}
