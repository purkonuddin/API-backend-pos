require('dotenv').config();
const connection = require('../configs/db');

module.exports = {
  chartThisWeek:()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT COUNT(*) AS `Rows`, DATE_FORMAT(created_at, '%d/%m/%Y') AS date, SUM(`sub_total`) Total FROM `card` WHERE YEARWEEK(`created_at`)=YEARWEEK(NOW()) GROUP BY `created_at` ORDER BY `created_at`", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  }
}
