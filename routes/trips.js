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
    if (req.query.page !== undefined)
        page = parseInt(req.query.page);
    offset = limit * (page - 1);

    models.Trip.findAll({
        attributes: { },
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
    }).then(function (user) {
        models.Trip.count().then(function (count) {
            res.send({ total: count, records: user });
        })
    })
});

router.get('/create', function (req, res, next) {
    console.log(req.params)
    console.log(req.query, parseInt(passengerId) )
    var passengerId=null;
    if (req.query.passengerId !== undefined)
    models.Trip.create({   
    state:'new' ,    
    passengerId: parseInt(req.query.passengerId)  
    }).then(function (user) {
        res.send(user);
    }).catch(function (error) {
        console.log(error)
        res.send({ error: error.errors });
    });
    else
        res.send({ error: 'Passenger Id missing'});
});
router.get('/:id', function (req, res, next) {
    console.log(req.params)
    res.send('respond with a resource');
});
module.exports = router;
