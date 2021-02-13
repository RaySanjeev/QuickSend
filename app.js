const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

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

// BODY PARSER
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// COMPRESSION
app.use(compression());

//ROUTES
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);

app.use(globalErrorHandler);
module.exports = app;
