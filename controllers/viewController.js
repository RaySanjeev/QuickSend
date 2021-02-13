const catchAsync = require('../utils/catchAsync');

exports.renderOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview', {
    title: 'Overview',
    users: req.users,
    messages: req.messages,
  });
});

exports.renderContacts = catchAsync(async (req, res, next) => {
  res.status(200).render('contact', {
    title: 'Contacts',
    user: req.user,
  });
});

exports.renderMessagePage = (req, res) => {
  res.status(200).render('sendMessage', {
    title: 'SendMessage',
    user: req.user,
    otp: req.otp,
  });
};
