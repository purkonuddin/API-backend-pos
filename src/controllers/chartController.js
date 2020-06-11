const chartModel = require('../models/chartModel');

exports.view=(req, res, err)=>{
  let test = chartModel.chartThisWeek();
  test.then((result)=>{
    console.log('charts : ', result);
    res.json(result);
  });
  test.catch(err=>console.log(err));
}

exports.user=async(req, res, err)=>{
  const user = req.query.id;

  var thisweek_tr = await chartModel.usertransactionthisweek(user).then((t) => {return t}).catch( err=>console.log(err));

  var today_Income = await chartModel.todaysincomeperuser(user).then((t) => {
    return {user:user,hari:t[0].hari,user_todayIncome:t[0].user_todayIncome == null ? 0 : t[0].user_todayIncome}}
  ).catch( err=>console.log(err));

  var thisweek_income = await chartModel.userincomethisweek(user).then((t) => {return t[0]}).catch( err=>console.log(err));
  var thismonth_income = await chartModel.userincomethismonth(user).then((t) => {return t[0]}).catch( err=>console.log(err));

  await res.end(JSON.stringify({
    user:user,
    records:thisweek_tr,
    income:{
      today:today_Income,
      thisweek:thisweek_income,
      thismonth:thismonth_income
    }
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

  await res.end(JSON.stringify({
    user:'all_users',
    description: 'menampilkan transaksi minggu ini, pendapatan: hari ini, minggu ini, bulan ini',
    records:thisweek_tr,
    income:{
      today:today_Income,
      thisweek:thisweek_income,
      thismonth:thismonth_income
    },
    charts: {
      week:chartThisWeek,
      month:chartThisMonth,
      year:chartThisYear
    }
  }));
}
