const express = require('express');

const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers, viewController.renderOverview);

router
  .route('/:slug')
  .get(userController.getUser, viewController.renderContacts);

module.exports = router;
