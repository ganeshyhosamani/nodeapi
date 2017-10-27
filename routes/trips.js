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
    var condition={}
    if (req.query.state!==undefined)
        condition.state = req.query.state
    
    if (req.query.fromDate!==undefined){
        if (condition.createdAt === undefined) condition.createdAt={}
        condition.createdAt.$gte = new Date(req.query.fromDate)
    }
        
    
    if (req.query.toDate!==undefined){
        if (condition.createdAt === undefined) condition.createdAt = {}
        condition.createdAt.$lte = new Date(req.query.toDate)
    }
        
    
    
    
    models.Trip.findAll({
        attributes: { },
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
        where: condition
    }).then(function (user) {
        models.Trip.count({ where: condition}).then(function (count) {
            res.send({ total: count, records: user });
        })
    })
});

router.post('/create', function (req, res, next) {
    console.log(req.params)
    console.log(req.body)
    console.log(req.query, parseInt(passengerId) )
    var passengerId=null;
    if (req.body.riderId !== undefined)
    models.Trip.create({   
    state:'NEW' ,    
    tripKey: req.body.key,
    from_lat: req.body.from.longitude,
    from_lon: req.body.from.latitude,
    to_lat: req.body.to.longitude,
    to_lon: req.body.to.latitude,
    passengerId: req.body.riderId,
    from: req.body.from.formatted_address,
    to: req.body.to.formatted_address
    }).then(function (user) {
        res.send(user);
        console.log(user)
    }).catch(function (error) {
        console.log(error)
        res.send({ error: error.errors });
    });
    else
        res.send({ error: 'Passenger Id missing'});
});
router.post('/update', function (req, res, next) {
    console.log(req.body)
    var passengerId=null;
    models.Trip.update(req.body,
        { where: { tripKey: req.body.tripKey}})
        .then(function (result) {
            res.send({ result });
        }).catch(function (err) {
        res.send(err.stack );
        })
 
});


router.get('/:id', function (req, res, next) {
    console.log(req.params)

    models.Trip.find({
        attributes: {},
        where: { tripKey: req.params.id}
    }).then(function (trip) {
        res.send({trip });
    })
    
});
module.exports = router;
