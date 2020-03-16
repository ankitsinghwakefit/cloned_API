var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Wake_007:Wakefitt@007@cluster0-wpzxt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},(err) =>{if(err){console.log("Error in DB: "+ err)}  else{console.log("DataBase Connected...")};});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRoute = require("./routes/articles");
var profileRoute = require("./routes/profile");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users/', usersRouter);
app.use('/api/articles/', articleRoute);
app.use("/api/profiles/",profileRoute);

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
