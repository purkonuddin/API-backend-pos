const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const logoutController = require('../controllers/logoutController');

Router.route('/')
    .get(userController.dataUsers);
Router.route('/login')
    .post(userController.login);
Router.route('/logout/:user_id')
    .get(logoutController.logout);
Router.route('/signup')
    .post(userController.signup);
Router.route('/:id_user')
    .delete(userController.delete)
    .patch(userController.update);

module.exports = Router;
