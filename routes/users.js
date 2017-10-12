var express = require('express');
var router = express.Router();
var models = require('../models');
var CryptoJS = require("crypto-js");
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query)
  var limit = 10;
  if (req.query.limit !== undefined)
    limit = parseInt(req.query.limit);
  var page = 1
  if (req.params.page !== undefined)
    page = parseInt(req.params.page);
  offset = limit * (page - 1);

  models.User.findAll({
    attributes: { exclude: ['password'] },
    limit: limit,
    offset: offset,
    $sort: { id: 1 }
  }).then(function (user) {
    models.User.count().then(function (count) {
      res.send({ total: count, records: user });
    })
  })
});

router.get('/create', function (req, res, next) {
  console.log(req.params)
  console.log(req.query)

  var utf8arr = CryptoJS.enc.Utf8.parse("password");
  var hash = CryptoJS.SHA256(utf8arr);
  var base64 = CryptoJS.enc.Base64.stringify(hash);

  models.User.create({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    password: base64,
    email: req.query.email,
    phone: req.query.phone,
    disabled: false
  }).then(function (user) {
    res.send(user);
  }).catch(function (error) {

    res.send({ error: error.errors});
  });

});
router.get('/:id', function (req, res, next) {
  console.log(req.params)
  res.send('respond with a resource');
});
module.exports = router;
