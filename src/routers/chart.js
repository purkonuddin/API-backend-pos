const express = require('express');
const auth = require('../helpers/auth');

const Router = express.Router();
const chartController = require('../controllers/chartController');
// get -> src/components/chart.componentDidMount
Router.get('/',chartController.view);
Router.get('/user',chartController.user);
Router.get('/all_users',chartController.all_users); 
module.exports = Router;
