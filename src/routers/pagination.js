const express = require('express');
const Router = express.Router();
const paginationController = require('../controllers/paginationController');

Router.route('/:page/:perpage')
    .get(paginationController.index);

module.exports = Router;