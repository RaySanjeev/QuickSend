const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide the name of the client'],
  },
  userID: {
    type: mongoose.ObjectId,
    required: [true, 'Please provide the user ID'],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  otp: {
    type: Number,
    required: [true, 'Please provide the OTP sent.'],
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
