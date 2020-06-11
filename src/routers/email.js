const express = require('express');
const Router = express.Router();
const emailController = require('../controllers/emailController');

Router.route('/lupa_password')
    .post(emailController.send);

module.exports = Router;
