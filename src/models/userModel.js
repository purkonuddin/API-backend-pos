require('dotenv').config();
const connection = require('../configs/db');

module.exports = {
    login : (id, password)=>{
      return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM `user` WHERE `id` = ? AND `password` = ?", [id, password], function(error, result, fields){
          if(!error){
              resolve(result)
          }else{
              reject(new Error(error))
          }
        })
      });
    },
    detailUser : (id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM `user` WHERE `id` = ?", id_user,(err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteUser : (id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query("DELETE FROM `user` WHERE `id` = ?", id_user,(err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getUsers : ()=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM user",(err, result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            });
        })
    },
    updateUser : (data,id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE user SET ? WHERE id=?",[data,id_user], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    insertUser: (data)=>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO user SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    }
}
