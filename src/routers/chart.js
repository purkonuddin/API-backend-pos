const express = require('express');
const auth = require('../helpers/auth');

const Router = express.Router();
const chartController = require('../controllers/chartController');

Router.get('/',chartController.view);
module.exports = Router;
