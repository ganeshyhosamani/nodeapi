var express = require('express');
var router = express.Router();
var models = require('../models');
var CryptoJS = require("crypto-js");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ganeshhosamani@gmail.com',
    pass: '9880768280'
  }
});

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

router.post('/create', function (req, res, next) {
  console.log(req.params)
  console.log(req.body)

  var utf8arr = CryptoJS.enc.Utf8.parse(req.body.password);
  var hash = CryptoJS.SHA256(utf8arr);
  var base64 = CryptoJS.enc.Base64.stringify(hash);

  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: base64,
    email: req.body.email,
    role:'rider',
    phone: req.body.phone,
    role: req.body.role,
    uid: req.body.uid,
    disabled: false
  }).then(function (user) {
    res.send(user);
  }).catch(function (error) {
    res.send({ error: error.errors});
  });

});
router.post('/create_driver', function (req, res, next) {
  console.log(req.params)
  console.log(req.body)

  var utf8arr = CryptoJS.enc.Utf8.parse(req.body.password);
  var hash = CryptoJS.SHA256(utf8arr);
  var base64 = CryptoJS.enc.Base64.stringify(hash);

  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: base64,
    email: req.body.email,
    phone: req.body.phone,
    role:'driver',
    disabled: false
  }).then(function (user) {
    console.log('user--------------- created ---------------')
    models.Driver.create({
      UserId: user.id,
      document_verification: 'pending',
      email_verifyed:false,
      online: false,
    }).then(function (driver) {
   //   console.log(driver)
      var mailOptions = {
        from: 'ganeshhosamani@gmail.com',
        to: user.email,
        subject: 'noreplay Conformation mail',
        html: 'Conformation sent from ridon <a href="google.com">confirmation Link</a>'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
     // res.send({ user:user,driver:driver});
      res.send(
        {
           id:user.id,
           driver_id:driver.id,
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           phone: user.phone,
           role: user.role,
           dob: user.dob,
           disabled: user.disabled,
           createdAt: user.createdAt,
           updatedAt: user.updatedAt,

          });
    })
      .catch(function (error) {

        res.send({ error: error.errors });
      });
    //res.send(user);


  }).catch(function (error) {

    res.send({ error: error.errors});
  });

});
router.post('/test',function (req, res, next) {
  console.log(req.body)
  console.log(typeof req.body)
  var a='a'

  res.send(a);
});
router.get('/:id', function (req, res, next) {
  console.log(req.query)

  models.User.find({
    attributes: { exclude: ['password'] },
   where:{uid:req.params.id}
  }).then(function (user) {
    res.send(user );
  })
});
module.exports = router;
