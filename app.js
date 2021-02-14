const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// COOKIE PARSER
app.use(cookieParser());

// PUG ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES ACCESS
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiter
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again after an hour.',
});
app.use('/api', limiter);

// BODY PARSER
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Data sanitisation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitisation against xss
app.use(xss());

// COMPRESSION
app.use(compression());

//ROUTES
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);

// ALL OTHER UNIDENTIFIED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
