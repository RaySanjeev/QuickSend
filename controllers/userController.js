const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  req.users = users;
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  let number;
  if (isFinite(req.query.num)) number = req.query.num;
  const user = await User.findOne({ number });

  req.user = user;
  next();
});
