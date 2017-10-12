var express = require('express');
var router = express.Router();
var models = require('../models');
var CryptoJS = require("crypto-js");



/* GET home page. */
router.get('/', function(req, res, next) {
  var utf8arr = CryptoJS.enc.Utf8.parse("password");
  var hash = CryptoJS.SHA256(utf8arr);
  var base64 = CryptoJS.enc.Base64.stringify(hash);

  models.User.create({
    firstName:'Ganesh',
    lastName:'H',
    password: base64,
    email:'ganesh@gmail.com',
    phone:'9980678976',
    disabled:false
  }).then(function (user) {
    res.send(user);
  });
  if(false)
    models.User.findOne({
      where:{ email: 'ganeshhosamani@gmail12.com' }}).then(function (user) {
      res.send(typeof user); 
    }).catch(function(err){
      res.send(err); 
    })
    if(false)
  models.User.findAll(({
    attributes: ['firstName', 'lastName']
  })).then(function(user){
    res.send(user); 
  })
 
//  res.render('index', { title: 'Express' });
});

module.exports = router;
