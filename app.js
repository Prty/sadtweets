////////////////////////////
// INIT MODULES & EXPRESS //
////////////////////////////

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



/////////////////////
// CONFIG DATABASE //
/////////////////////

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database



/////////////////////
// CONFIG PASSPORT //
/////////////////////

require('./config/passport')(passport); // pass passport for configuration



////////////////
// APP CONFIG //
////////////////

// set up our express application
app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({secret: 'keyboard cat'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// use static public directory
app.use(express.static(path.join(__dirname, 'public')));




////////////
// ROUTES //
////////////

// load our routes and pass in our app and fully configured passport
require('./routes')(app, passport);



/////////////////////
// error handlers  //
/////////////////////

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
