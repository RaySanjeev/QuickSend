const catchAsync = require('../utils/catchAsync');

exports.renderOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview', {
    title: 'Overview',
    users: req.users,
  });
});

exports.renderContacts = catchAsync(async (req, res, next) => {
  const url = req.originalUrl.split('?')[0];
  console.log(url);
  if (!req.query.num)
    // return res.redirect(url);
    res.status(200).render('contact', {
      title: 'Contacts',
      user: req.user,
    });
});
