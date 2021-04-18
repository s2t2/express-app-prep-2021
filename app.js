require('dotenv').config(); // use environment variables from .env file

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session') // FLASH
var flash = require('connect-flash'); // FLASH
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts'); // EJS LAYOUTS

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stocksRouter = require('./routes/stocks');

var SESSION_SECRET = process.env.SESSION_SECRET || "super secret" // set this to something in production

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts); // EJS LAYOUTS
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(SESSION_SECRET));
app.use(session({
  cookie: { maxAge: 60000},
  secret: SESSION_SECRET,
  name: 'stocks-app-session',
  resave: true,
  saveUninitialized: true
})); // FLASH
app.use(flash()); // FLASH
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
}); // FLASH
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
