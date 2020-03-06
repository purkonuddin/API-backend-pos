const chartModel = require('../models/chartModel');

exports.view=(req, res, err)=>{
  let test = chartModel.chartThisWeek();
  test.then((result)=>{
    console.log('charts : ', result);
    res.json(result);
  });
  test.catch(err=>console.log(err));
}
