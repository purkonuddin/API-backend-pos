const chartModel = require('../models/chartModel');

exports.view=(req, res, err)=>{
  let test = chartModel.chartThisWeek();
  test.then((result)=>{
    // console.log('charts : ', result);
    res.json(result);
  });
  test.catch(err=>console.log(err));
}

exports.user=async(req, res, err)=>{
  const user = req.query.id;

  var today_myIncome = await chartModel.todaysincomeperuser(user).then((t) => {
    return t[0].total == null ? 0 : t[0].total}
  ).catch( err=>console.log(err));

  var thisweek_myincome = await chartModel.userincomethisweek(user).then((t) => {return t[0].total == null ? 0 : t[0].total}).catch( err=>console.log(err));
  var thismonth_myincome = await chartModel.userincomethismonth(user).then((t) => {return t[0].total == null ? 0 : t[0].total}).catch( err=>console.log(err));
  var mychartThisYear = await chartModel.userChartThisYear(user).then((t) => {return t}).catch( err=>console.log(err));
  var mytrthisweek = await chartModel.usertransactionthisweek(user).then((t) => {return t}).catch( err=>console.log(err));

  var mybulan =  ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' ,'Oktober', 'November', 'Desember'];
  var mydataview_year = [];

  for (var i = 0; i < 12; i++) {
    let id = i+1;
    let newdata = {id:id, bulan:mybulan[i], rows: 0, income:0};

    for (var n = 0; n < mychartThisYear.length; n++) {  //3,4,5
      if (mychartThisYear[n].id_bulan === id) {
        newdata.rows = mychartThisYear[n].Rows;
        newdata.income = mychartThisYear[n].Total;
      }
    }
    mydataview_year.push(newdata);
  }

  var mylabels = [];
  var mydatasets_income = [];
  var mydatasets_rows = [];

  for (var i = 0; i < mydataview_year.length; i++) {
    mylabels.push(mydataview_year[i].bulan);
    mydatasets_income.push(mydataview_year[i].income);
    mydatasets_rows.push(mydataview_year[i].rows);
  }

  await res.end(JSON.stringify({
    myChart_labels:mylabels,
    myChart_income:mydatasets_income,
    myChart_rows:mydatasets_rows,
    records_thisweek:mytrthisweek,
    myIncome_today:today_myIncome,
    myIncome_thisweek:thisweek_myincome,
    myIncome_thismonth:thismonth_myincome
    // user:user,
    // records:thisweek_tr,
    // income:{
    //   today:today_Income,
    //   thisweek:thisweek_income,
    //   thismonth:thismonth_income
    // }

  }));
}

exports.all_users=async(req, res, err)=>{
  var thisweek_tr = await chartModel.transactionthisweek().then((t) => {return t}).catch( err=>console.log(err));

  var today_Income = await chartModel.todaysincome().then((t) => {
    return {Rows:0, hari:10, total:t[0].total == null ? 0 : t[0].total};
  }).catch( err=>console.log(err));

  var thisweek_income = await chartModel.incomethisweek().then((t) => {return t[0]}).catch( err=>console.log(err));
  var thismonth_income = await chartModel.incomethismonth().then((t) => {return t[0]}).catch( err=>console.log(err));

  var chartThisWeek = await chartModel.chartThisWeek().then((t) => {return t}).catch( err=>console.log(err));
  var chartThisMonth = await chartModel.chartThisMonth().then((t) => {return t}).catch( err=>console.log(err));
  var chartThisYear = await chartModel.chartThisYear().then((t) => {return t}).catch( err=>console.log(err));

  var bulan =  ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' ,'Oktober', 'November', 'Desember'];
  var dataview_year = [];

  for (var i = 0; i < 12; i++) {
    let id = i+1;
    let newdata = {id:id, bulan:bulan[i], rows: 0, income:0};

    for (var n = 0; n < chartThisYear.length; n++) {  //3,4,5
      if (chartThisYear[n].id_bulan === id) {
        newdata.rows = chartThisYear[n].Rows;
        newdata.income = chartThisYear[n].Total;
      }
    }
    dataview_year.push(newdata);
  }

  var labels = [];
  var datasets_income = [];
  var datasets_rows = [];

  for (var i = 0; i < dataview_year.length; i++) {
    labels.push(dataview_year[i].bulan);
    datasets_income.push(dataview_year[i].income);
    datasets_rows.push(dataview_year[i].rows);
  }

  await res.end(JSON.stringify({
    labels:labels,
    income:datasets_income,
    rows:datasets_rows,
    records:thisweek_tr
    /*
    user:'all_users',
    description: 'menampilkan transaksi minggu ini, income hari/minggun, bulan, data untuk chart bulanan',
    records:thisweek_tr,
    income:{
      today:today_Income,
      thisweek:thisweek_income,
      thismonth:thismonth_income
    },
    charts: {
      week:0,//chartThisWeek,
      month:0,//chartThisMonth,
      year:{labels:labels, datasets:{income:datasets_income, rows:datasets_rows}}
    },
    */
  }));
}
