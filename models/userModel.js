const mongoose = require('mongoose');

const userSchmema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide your name'],
  },
  number: {
    type: String,
    required: [true, 'Please provide your number'],
    unique: true,
  },
});

const User = mongoose.model('User', userSchmema);

module.exports = User;
