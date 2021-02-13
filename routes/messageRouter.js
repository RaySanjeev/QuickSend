const express = require('express');

const messageController = require('../controllers/messageController');
const router = express.Router();

router.route('/sendMessage').post(messageController.sendMessage);

module.exports = router;
