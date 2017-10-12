
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');
var Strategy = require('passport-local').Strategy;
const passport = require('passport')
const session = require('express-session')
var CryptoJS = require("crypto-js");

var index = require('./routes/index');
var users = require('./routes/users');
var trips = require('./routes/trips');


var app = express();


var server = require('http').Server(app);
var io = require('socket.io')(server);
//var socket_nahdler = require('./sockets');
passport.use(new Strategy(
  function (username, password, cb) {
    console.log('user in password')
    models.User.findOne({ where: { email: username } }).then(function (user) {
      var utf8arr = CryptoJS.enc.Utf8.parse(password);
      var hash = CryptoJS.SHA256(utf8arr);
      var base64 = CryptoJS.enc.Base64.stringify(hash);
      console.log(cb)
      console.log(!(user.password === base64))
      console.log(!user.password === base64)
      console.log(user.password)
      // if (err) { return done(err); }
      if (!user) { return cb(null, false); }
      if (!(user.password === base64)) {
        console.log('login failed')
        return cb(null, { message:'password not matching'});
      }
      
      return cb(null, user.dataValues);
    })

  }));
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  console.log('id, cb', id)
  models.User.findOne({ where: { id: id } }).then(function (user) {
    console.log('id, cb', user)
    if (!user) { return cb(null, {}); }
    return cb(null, user.dataValues);
  })

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'rkrb', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/trips', trips);

app.get('/login',
  passport.authenticate('local', { failWithError: true }),
  function (req, res) {

    res.send(req.user);
  },

  function (err, req, res, next) {
    // handle error
    return res.json(err);

  });

app.get('/getUser', function (req, res) {

  res.send(req.user);
});


app.get('/logout',
  function (req, res) {
    req.logout();
    console.log()
    res.json({ message: 'Logout Successfull' })
  });

//io.sockets.on('connection', socket_nahdler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
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


//module.exports = app;
module.exports = { app: app, server: server, io: io };