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
  chartThisMonth:()=>{
    // grafik transaksi selama minggu ini
    return new Promise((resolve, reject)=>{
        connection.query("SELECT YEAR(`created_at`) AS tahun, MONTH(`created_at`) AS bulan, MONTHNAME(`created_at`) AS nama_bulan, WEEK(`created_at`) AS minggu_n, count(`sub_total`) AS item, SUM(`sub_total`) AS total FROM post.card WHERE MONTH(`created_at`) = MONTH(NOW()) GROUP BY WEEK(`created_at`)", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  chartThisYear:()=>{
    // grafik transaksi tahun
    return new Promise((resolve, reject)=>{
        connection.query("SELECT MONTH(`created_at`) AS id_bulan, COUNT(*) AS `Rows`, DATE_FORMAT(created_at, '%m/%Y') AS date, MONTHNAME(`created_at`) AS bulan,SUM(`sub_total`) Total FROM post.card WHERE YEAR(`created_at`)=YEAR(NOW()) GROUP BY MONTH(`created_at`) ORDER BY MONTH(`created_at`)", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  userChartThisYear:(id_user)=>{
    // grafik transaksi tahun
    return new Promise((resolve, reject)=>{
        connection.query("SELECT MONTH(`created_at`) AS id_bulan, COUNT(*) AS `Rows`, DATE_FORMAT(created_at, '%m/%Y') AS date, MONTHNAME(`created_at`) AS bulan,SUM(`sub_total`) Total FROM post.card WHERE YEAR(`created_at`)=YEAR(NOW()) AND `user` = ? GROUP BY MONTH(`created_at`) ORDER BY MONTH(`created_at`)", id_user, (err, result)=>{
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
        connection.query("SELECT COUNT(*) AS `Rows`, DAY(CURRENT_DATE()) AS hari, SUM(sub_total) as total FROM post.card WHERE created_at >= CURRENT_DATE()", (err, result)=>{
            if(!err){
              // console.log(result);
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
  },
  todaysincomeperuser:(id_user)=>{
    // pendapatan transaksi user hari ini
    return new Promise((resolve, reject)=>{
        connection.query("SELECT `user`, DAY(CURDATE()) AS hari , SUM(`sub_total`) as total FROM post.card WHERE `created_at` >= CURRENT_DATE() and `user` = ?", id_user, (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  // week
  // income harian minggu ini
  incomeperdaysthisweek:()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT COUNT(*) AS `Rows`, MONTH(NOW()) AS bulan, SUM(`sub_total`) AS total from post.card where MONTH(`created_at`)=MONTH(NOW()) ORDER BY `created_at`", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //transaksi minggu ini
  transactionthisweek:()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT `no_transaction`, COUNT(*) AS `Rows`, SUM(`sub_total`) AS total, `created_at` FROM post.card WHERE YEARWEEK(`created_at`)=YEARWEEK(NOW()) GROUP BY `no_transaction` ORDER BY `no_transaction`", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //transaksi minggu ini
  usertransactionthisweek:(id_user)=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT `no_transaction`, COUNT(*) AS `Rows`, SUM(`sub_total`) AS total, DATE_FORMAT(`created_at`, '%d/%m/%Y') AS tanggal FROM post.card WHERE YEARWEEK(`created_at`)=YEARWEEK(NOW()) AND `user` = ? GROUP BY `no_transaction` ORDER BY `no_transaction`", id_user, (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //total income user minggu ini returun: {Rows, bulan ini, total transaksi}
  incomethisweek:()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT `user`, YEARWEEK(NOW()) AS minggu , SUM(`sub_total`) as total FROM post.card WHERE YEARWEEK(`created_at`)=YEARWEEK(NOW())", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //total income user minggu ini returun: {Rows, bulan ini, total transaksi}
  userincomethisweek:(id_user)=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT `user`, WEEK(NOW()) AS minggu , SUM(`sub_total`) as total FROM post.card WHERE YEARWEEK(`created_at`)=YEARWEEK(NOW()) AND `user` = ?", id_user, (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //total income bulan ini returun: {Rows, bulan ini, total transaksi}
  incomethismonth:()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT COUNT(*) AS `Rows`, MONTH(NOW()) AS bulan, SUM(`sub_total`) AS total from post.card where MONTH(`created_at`)=MONTH(NOW()) ORDER BY `created_at`", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //list transaksi bulan ini returun: {tgl, no_trx, id user, jumlah item, total trx, date}
  transactionthismonth:()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT DATE_FORMAT(created_at, '%d') AS date_thisMonth, `no_transaction`, `user`,COUNT(*) AS `Rows`, sum(`sub_total`) AS tr_total, `created_at` FROM post.card group by `user`, `no_transaction` having MONTH(`created_at`)=MONTH(NOW()) order by `no_transaction`", (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
  //total income user bulan ini returun: {user id, bulan ini, total transaksi}
  userincomethismonth:(id_user)=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT `user`, MONTH(NOW()) AS bulan, SUM(`sub_total`) AS total FROM post.card WHERE MONTH(`created_at`)=MONTH(NOW()) AND `user` = ? ORDER BY `created_at`", id_user, (err, result)=>{
            if(!err){
                resolve(result);
            }else{
                reject(new Error(err));
            }
        });
    })
  },
}
