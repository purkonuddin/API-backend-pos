const express = require('express');
const Router = express.Router();
const searchController = require('../controllers/searchController');

Router.route('/')
    .post(searchController.index);
    
module.exports = Router;