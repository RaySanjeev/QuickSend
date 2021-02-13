const Vonage = require('@vonage/server-sdk');

const User = require('../models/userModel');
const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.createOTP = (req, res, next) => {
  const otp = Math.trunc(Math.random() * 1000000);
  req.otp = otp;
  next();
};

const addMessages = catchAsync(async (user, otp) => {
  const name = user.name;
  const id = user._id;
  console.log(new Date().toDateString());

  const message = await Message.create({
    name,
    userID: id,
    time: new Date(),
    otp,
  });
});

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  // signatureSecret: process.env.VONAGE_SIGNATURE_SECRET,
  // signatureMethod: process.env.VONAGE_SIGNATURE_METHOD,
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.userID);
  console.log(req.body);

  const from = `QuickSend`;
  const to = user.number;
  const text = `Hey there!. Welcome to the the QuickSend family. Your OTP is : ${req.body.otp}`;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        err,
      });
    }

    if (responseData.messages[0]['status'] === '0') {
      addMessages(user, req.body.otp);
      return res.status(200).json({
        status: 'success',
        message: 'Message sent successfully',
      });
    }

    res.status(422).json({
      status: 'failed',
      message: 'Unable to send message. Please try again later.',
      data: `Message failed with error: ${responseData.messages[0]['error-text']}`,
    });
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find().sort({ time: -1 });

  req.messages = messages;
  next();
});
