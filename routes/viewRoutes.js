const express = require('express');

const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router
  .route('/')
  .get(
    userController.getAllUsers,
    messageController.getMessages,
    viewController.renderOverview
  );

router
  .route('/:num')
  .get(userController.getUser, viewController.renderContacts);

router
  .route('/:num/sendMessage')
  .get(
    userController.getUser,
    messageController.createOTP,
    viewController.renderMessagePage
  );
module.exports = router;
