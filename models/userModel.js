const mongoose = require('mongoose');
const slugify = require('slugify');

const userSchema = new mongoose.Schema({
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
  slug: String,
});

userSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
