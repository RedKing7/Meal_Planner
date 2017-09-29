require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;//fix for deprecation warnings
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
})

db.on('open', () => {
  console.log('Connected to MongoDB');
})

const index = require('./routes/plan_controller');
const users = require('./routes/user_controller');
const meals = require('./routes/meal_controller');
const households = require('./routes/household_controller');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use('/', index);
app.use('/users/:userId/:isHousehold/meals', meals);
app.use('/users', users);
app.use('/households', households);
app.use('/households/:userId/:isHousehold/meals', meals)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
