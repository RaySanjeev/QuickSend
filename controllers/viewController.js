const catchAsync = require('../utils/catchAsync');

exports.renderOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview', {
    title: 'Overview',
  });
});
