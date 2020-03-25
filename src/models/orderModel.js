require('dotenv').config();
const connection = require('../configs/db');

module.exports = {
  insertOrder: (data)=>{
    // digunakan oleh order.order
      return new Promise((resolve, reject)=>{
          connection.query("INSERT INTO card SET ?", data, (err, result)=>{
              if(!err){
                  resolve(result);
              }else{
                  reject(new Error(err));
              }
          });
      })
  },
  getOrderBytransaction : (no_transaction)=>{
    // digunakan oleh order.cards
      return new Promise((resolve, reject)=>{
          connection.query("SELECT * FROM `card` WHERE `no_transaction` = ? ORDER BY `product` DESC", no_transaction, (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
          });
      });
  },
  getOrderTotal : ()=>{
    return new Promise((resolve, reject)=>{
        // COALESCE mengembalikan ekspressi null pertama dalam daftar. yang berguna untuk memeriksa suatu kolom ada datanya atau tidak
        // jika tidak ada danyanya atau null maka diberi data pengganti
        connection.query("SELECT COALESCE(`user`, 'TOTAL') AS `user`, COALESCE(`no_transaction`, 'SUB TOTAL') AS `no_transaction`,  SUM(`sub_total`) AS `total` FROM `card` GROUP BY `user` DESC, `no_transaction` DESC WITH ROLLUP", (err, result)=>{
          if(!err){
              resolve(result);
          }else{
              reject(new Error(err));
          }
        });
    });
    },
    insertCard: (data)=>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO sementara SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    getCards: (id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT `sementara`.*, `product_name`.`name`, `product_name`.`price` FROM `sementara` INNER JOIN `product_name` ON `sementara`.`id_barang` = `product_name`.`id` WHERE `sementara`.`id_user` = ? && `sementara`.`status` = ?", [id_user,0],(err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    getMaxNoOrder: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT no_transaction AS max FROM card ORDER BY created_at DESC LIMIT 1",(err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    },
    updateCardSts:(id_card)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE `sementara` SET `status`=1 WHERE `id`=?", id_card,(err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            });
        })
    }

}
