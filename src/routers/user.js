const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const logoutController = require('../controllers/logoutController');

// get -> src/components/users.reloadData
Router.route('/')
    .get(userController.dataUsers);
// post -> src/components/login.onSubmitForm
Router.route('/login')
    .post(userController.login);
Router.route('/logout/:user_id')
    .get(logoutController.logout);
// post -> src/components/users/onSubmitForm
Router.route('/signup')
    .post(userController.signup);
// get -> src/components/users.getDataId(:id)
// delete -> src/components/users.handleRemove(:id)
Router.route('/:id_user')
    .get(userController.view)
    .delete(userController.delete)
    .post(userController.upload)
    .patch(userController.update);

module.exports = Router;
