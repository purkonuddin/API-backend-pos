require('dotenv').config();
const connection = require('../configs/db');

module.exports = {
  chartThisWeek:()=>{
    // grafik transaksi selama minggu ini
    return new Promise((resolve, reject)=>{
        connection.query("SELECT COUNT(*) AS `Rows`, DATE_FORMAT(created_at, '%d/%m/%Y') AS date, SUM(`sub_total`) Total FROM post.card WHERE YEARWEEK(`created_at`)=YEARWEEK(NOW()) GROUP BY `created_at` ORDER BY `created_at`", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  todaysincome:()=>{
    // pendapatan transaksi hari ini
    return new Promise((resolve, reject)=>{
        connection.query("SELECT SUM(sub_total) as todayIncome FROM post.card WHERE created_at >= CURRENT_DATE()", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  todaystransaction:()=>{
    // jumlah transaksi hari ini
    return new Promise((resolve, reject)=>{
        connection.query("SELECT SUM(sub_total) as todayIncome FROM post.card WHERE created_at >= CURRENT_DATE()", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  }
}
